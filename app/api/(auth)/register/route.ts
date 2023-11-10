import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByEmail } from '../../../../database/users';
import { UserIdEmailRole } from '../../../../migrations/00008-createTableUsers';
import { secureCookieOptions } from '../../../../util/secureCookieOptions';

const registerSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
  role: z.number().min(1),
});

export type RegisterResponseBodyPost =
  | {
      user: UserIdEmailRole;
    }
  | {
      errors: { message: string | number }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 403 },
    );
  }

  // 3. Check if user already exist in the database
  const user = await getUserByEmail(result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 403 },
    );
  }

  //  At this stage you can check if the password matches the confirm password

  // 4. Hash the plain password from the user
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. Save the user information with the hashed password in the database
  const newUser = await createUser(
    result.data.email,
    passwordHash,
    Number(result.data.role),
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  // 4. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 5. Create the session record
  const session = await createSession(newUser.id, token);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      {
        status: 401,
      },
    );
  }

  // 6. Send the new cookie in the headers

  // cookies().set({
  //   name: 'sessionToken',
  //   value: session.token,
  //   httpOnly: true,
  //   path: '/',
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 60 * 60 * 48, // Expires in 24 hours,
  //   sameSite: 'lax', // this prevents CSRF attacks
  // });

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 6. Return the new user information without the password hash
  return NextResponse.json({
    user: newUser,
  });
}
