import { NextRequest, NextResponse } from 'next/server';
import { putPersonalDataByUserID } from '../../../../database/users';
import { UserAllNoPassword } from '../../../../migrations/00008-createTableUsers';

// put personal data

export type PersonalDataBodyPost =
  | {
      user: UserAllNoPassword;
    }
  | {
      errors: { message: string | number }[];
    };

/* const putPersonalDataSchema = z.object({
  userId: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  pronouns: z.string(),
  phoneNumber: z.number(),
  birthdate: z.coerce.date(),
  countryId: z.string(),
  photo: z.string(),
}); */

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<PersonalDataBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  // Validate the user data
  /*   const result = putPersonalDataSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'error adding personal data' }] },
      { status: 403 },
    );
  } */
  const updatedUserWithPersonalInfo = await putPersonalDataByUserID(
    Number(body.userId),
    body.firstname,
    body.lastname,
    body.pronouns,
    body.phoneNumber,
    body.birthdate,
    body.countryId,
    body.photo,
  );

  if (!updatedUserWithPersonalInfo) {
    return NextResponse.json(
      { errors: [{ message: 'Error adding info to the user' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    user: updatedUserWithPersonalInfo,
  });
}
