import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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

const userIdParser = z.number();
const firstnameParser = z.string();

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<PersonalDataBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  // Validate the user data
  const userIdZod = userIdParser.safeParse(body.userId);

  if (!userIdZod.success) {
    return NextResponse.json(
      { errors: [{ message: 'error adding userId' }] },
      { status: 403 },
    );
  }

  const firstnameZod = firstnameParser.safeParse(body.firstname);

  if (!firstnameZod.success) {
    return NextResponse.json(
      { errors: [{ message: 'error adding firstname' }] },
      { status: 403 },
    );
  }
  console.log(firstnameZod);

  /*
const result = putPersonalDataSchema.safeParse(body);
if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'error adding personal data' }] },
      { status: 403 },
    );
  }  */

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
