import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserById } from '../../../database/users';
import { User } from '../../../migrations/00004-createTableUsers';

const personalDataSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  pronouns: z.string().min(3),
  phoneNumber: z.number().min(1),
  birthdate: z.date(),
  countryId: z.string().min(3),
});

export type UserResponseBodyPut =
  | { user: User }
  | {
      error: string;
    };

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
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
  const user = await updateUserById(
    userId,
    result.data.firstName,
    result.data.lastName,
    result.data.pronouns,
    result.data.phoneNumber,
    result.data.birthdate,
    result.data.countryId,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Error updating the animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}
