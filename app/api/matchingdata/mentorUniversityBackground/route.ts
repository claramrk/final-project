import { NextRequest, NextResponse } from 'next/server';
import {
  createMentorUniversityBackground,
  getMentorUniversityBackgroundbyUserID,
} from '../../../../database/mentorUniversityBackground';
import { MentorUniversityBackground } from '../../../../migrations/00011-createTableMentorUniversityBackgrounds';

export type MentorUniversityBackgroundBodyPost =
  | {
      mentorUniversityBackground: MentorUniversityBackground;
    }
  | {
      errors: { message: string | number }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MentorUniversityBackgroundBodyPost>> {
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
  const newMentorUniversityBackground = await createMentorUniversityBackground(
    body.userId,
    body.studylevel,
    body.attendanceType,
    body.universityId,
    body.subjectId,
  );

  if (!newMentorUniversityBackground) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    mentorUniversityBackground: newMentorUniversityBackground,
  });
}

// get user
export type MentorUniversityBackgroundBodyGet =
  | {
      mentorUniversityBackground: MentorUniversityBackground[];
    }
  | {
      error: string | number;
    };

export async function GET(
  request: NextRequest,
  userId: number,
): Promise<NextResponse<MentorUniversityBackgroundBodyGet>> {
  if (!userId) {
    return NextResponse.json(
      {
        error: 'no User Id',
      },
      { status: 404 },
    );
  }

  const mentorUniversityBackgroundByUserId =
    await getMentorUniversityBackgroundbyUserID(userId);

  return NextResponse.json({
    mentorUniversityBackground: mentorUniversityBackgroundByUserId,
  });
}
