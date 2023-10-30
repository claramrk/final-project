import { NextRequest, NextResponse } from 'next/server';
import {
  getMentorMatchingInfobyUserID,
  putMentorMatchingInfobyUserID,
} from '../../../../database/mentorMatchingInfo';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

export type MentorMatchingInfoBodyPost =
  | {
      user: UserAll[];
    }
  | {
      errors: { message: string | number }[];
    };

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<MentorMatchingInfoBodyPost>> {
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
  const updatedUserWithMatchingInfo = await putMentorMatchingInfobyUserID(
    Number(body.userId),
    Number(body.maxCapacity),
  );

  return NextResponse.json({
    user: updatedUserWithMatchingInfo,
  });
}

// GET user by ID
export type MentorMatchingInfoBodyGet =
  | {
      mentorMatchingInfo: UserAll[];
    }
  | {
      error: string | number;
    };

export async function GET(
  request: NextRequest,
  userId: number,
): Promise<NextResponse<MentorMatchingInfoBodyGet>> {
  if (!userId) {
    return NextResponse.json(
      {
        error: 'no User Id',
      },
      { status: 404 },
    );
  }

  const mentorMatchingInfoByUserId = await getMentorMatchingInfobyUserID(
    Number(userId),
  );

  return NextResponse.json({
    mentorMatchingInfo: mentorMatchingInfoByUserId,
  });
}
