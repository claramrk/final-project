import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserById, updateUserbyID } from '../../../../database/users';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

// get user
type UserResponseBodyGet =
  | { user: UserAll }
  | {
      error: string;
    };

const userSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
});

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

// update personal data
const UsersSchema = z.object({
  id: z.number(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  pronouns: z.string().min(3),
  phoneNumber: z.number(),
  birthdate: z.date(),
  countryId: z.string().min(3),
});

export type UserResponseBodyPut =
  | { user: UserAll }
  | {
      error: string;
    };

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<UserResponseBodyPut>> {
  const body = await request.json();

  /*
  // zod please verify the body matches my schema
  const result = usersSchema.safeParse(body);

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

  */

  // what is happening here? this is actually posting the user query the database to update the animal

  const updatedUser = await updateUserbyID(
    body.data.id,
    body.data.firstName,
    body.data.lastName,
    body.data.pronouns,
    body.data.phoneNumber,
    body.data.birthdate,
    body.data.countryId,
  );

  /*
  const updatedUser = await updateUserbyID(
    userId,
    result.data.firstName,
    result.data.lastName,
    result.data.pronouns,
    result.data.phoneNumber,
    result.data.birthdate,
    result.data.countryId,
  );
*/

  if (!updatedUser) {
    return NextResponse.json(
      {
        error: 'Error updating the user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: updatedUser,
  });
}
/*

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyPut>> {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
  const result = animalSchema.safeParse(body);

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
  const animal = await updateAnimalById(
    animalId,
    result.data.firstName,
    result.data.type,
    result.data.accessory,
  );

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Error updating the animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}
*/
