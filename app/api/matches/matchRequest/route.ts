import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createMatchRequest } from '../../../../database/matches';
import { Match } from '../../../../migrations/00015-createTableMatches';

export type MatchRequestBodyPost =
  | {
      matchRequest: Match;
    }
  | {
      errors: { message: string | number }[];
    };

const matchRequestSchema = z.object({
  menteeUserId: z.number(),
  mentorUserId: z.number(),
  messageToMentor: z.string(),
  statusInternal: z.string(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MatchRequestBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  // Validate the user data
  const result = matchRequestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'error creating match' }] },
      { status: 403 },
    );
  }

  const newMatchRequest = await createMatchRequest(
    result.data.menteeUserId,
    result.data.mentorUserId,
    result.data.messageToMentor,
    result.data.statusInternal,
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
