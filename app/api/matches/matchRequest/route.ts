import { NextRequest, NextResponse } from 'next/server';
import { createMatchRequest } from '../../../../database/matches';
import { Match } from '../../../../migrations/00007-createTableMatches';

export type MatchRequestBodyPost =
  | {
      matchRequest: Match;
    }
  | {
      errors: { message: string | number }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MatchRequestBodyPost>> {
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
  const newMatchRequest = await createMatchRequest(
    Number(body.menteeUserId),
    Number(body.mentorUserId),
    body.messageToMentor,
    body.statusInternal,
  );

  if (!newMatchRequest) {
    return NextResponse.json(
      { errors: [{ message: 'Error requesting Mentor' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    matchRequest: newMatchRequest,
  });
}
/*
// get user
export type MenteeTargetUniversitySubjectBodyGet =
  | {
      menteeTargetUniversitySubject: MenteeTargetUniversitySubject[];
    }
  | {
      error: string | number;
    };

export async function GET(
  request: NextRequest,
  userId: number,
): Promise<NextResponse<MenteeTargetUniversitySubjectBodyGet>> {
  if (!userId) {
    return NextResponse.json(
      {
        error: 'no User Id',
      },
      { status: 404 },
    );
  }

  const menteeTargetUniversitySubjectByUserId =
    await getMenteeTargetUniversitySubjectbyUserID(Number(userId));

  return NextResponse.json({
    matchRequest: menteeTargetUniversitySubjectByUserId,
  });
}
 */
