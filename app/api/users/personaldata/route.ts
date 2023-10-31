import { NextRequest, NextResponse } from 'next/server';
import {
  getUserById,
  putPersonalDataByUserID,
} from '../../../../database/users';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

// get user
type UserResponseBodyGet =
  | { user: UserAll }
  | {
      error: string;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyGet>> {
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

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<PersonalDataBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  // Validate the user data
  /* const result = registerSchema.safeParse(body);

  if (!body.success) {
    return NextResponse.json(
      { errors: body.error.issues },
      {
        status: 400,
      },
    );
  }
*/
  const updatedUserWithPersonalInfo = await putPersonalDataByUserID(
    Number(body.userId),
    body.firstname,
    body.lastname,
    body.pronouns,
    body.phone_number,
    body.birthdate,
    body.country_id,
  );

  return NextResponse.json({
    user: updatedUserWithPersonalInfo,
  });
}
