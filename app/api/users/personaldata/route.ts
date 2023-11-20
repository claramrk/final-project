import { NextRequest, NextResponse } from 'next/server';
import {
  getUserById,
  putPersonalDataByUserID,
} from '../../../../database/users';
import { UserAll } from '../../../../migrations/00008-createTableUsers';

// get user
type UserResponseBodyGet =
  | { user: UserAll }
  | {
      error: string;
    };

export async function GET(): Promise<NextResponse<UserResponseBodyGet>> {
  const userId = Number(1);

  const user = await getUserById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

// put personal data

export type PersonalDataBodyPost =
  | {
      user: UserAll[];
    }
  | {
      errors: { message: string | number }[];
    };

/* const putPersonalDataSchema = z.object({
  userId: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  pronouns: z.string(),
  phone_number: z.number(),
  birthdate: z.date(),
  country_id: z.string(),
  photo: z.string(),
}); */

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<PersonalDataBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  // Validate the user data
  /*  const result = putPersonalDataSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'error creating match' }] },
      { status: 403 },
    );
  } */
  const updatedUserWithPersonalInfo = await putPersonalDataByUserID(
    Number(body.userId),
    body.firstname,
    body.lastname,
    body.pronouns,
    body.phone_number,
    body.birthdate,
    body.country_id,
    body.photo,
  );

  return NextResponse.json({
    user: updatedUserWithPersonalInfo,
  });
}
