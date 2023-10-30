import { NextRequest, NextResponse } from 'next/server';
import { createMentorUniversityBackground } from '../../../../database/mentorUniversityBackground';
import { MentorUniversityBackground } from '../../../../migrations/00005-createTableMentorUniversityBackgrounds';

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
    body.studyLevel,
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
