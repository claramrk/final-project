import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserbyID } from '../../../../database/users';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

const personalDataSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  pronouns: z.string().min(3),
  phoneNumber: z.number().min(1),
  birthdate: z.string().min(3),
  countryId: z.string().min(3),
});

export type UserResponseBodyPut =
  | { user: UserAll }
  | {
      error: string;
    };

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);

  //getsessiontoken instead!

  if (!userId) {
    return NextResponse.json(
      {
        error: ' id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
  const result = personalDataSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  // query the database to update the animal
  const updatedUser = await updateUserbyID(
    userId,
    result.data.firstName,
    result.data.lastName,
    result.data.pronouns,
    result.data.phoneNumber,
    result.data.birthdate,
    result.data.countryId,
  );

  if (!updatedUser) {
    return NextResponse.json(
      {
        error: 'Error updating the animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: updatedUser,
  });
}
