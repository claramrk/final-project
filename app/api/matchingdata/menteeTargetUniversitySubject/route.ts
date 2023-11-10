import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createMenteeTargetUniversitySubject,
  getMenteeTargetUniversitySubjectbyUserID,
} from '../../../../database/menteeTargetUniversitySubject';
import { MenteeTargetUniversitySubject } from '../../../../migrations/00013-createTableMenteeUniversityApplications';

export type MenteeTargetUniversitySubjectBodyPost =
  | {
      menteeTargetUniversitySubject: MenteeTargetUniversitySubject;
    }
  | {
      errors: { message: string | number }[];
    };
/*
const menteeTargetUniversitySubjectSchema = z.object({
  userId: z.number(),
  studylevel: z.number(),
  firstUniversityId: z.number(),
  firstSubjectId: z.number(),
  secondUniversityId: z.number(),
  secondSubjectId: z.number(),
  thirdUniversityId: z.number(),
  thirdSubjectId: z.number(),
}); */

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MenteeTargetUniversitySubjectBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  /*   // Validate the user data
  const result = menteeTargetUniversitySubjectSchema.safeParse(body);

  if (!body.success) {
    return NextResponse.json(
      { errors: body.error.issues },
      {
        status: 400,
      },
    );
  } */

  const newMenteeTargetUniversitySubject =
    await createMenteeTargetUniversitySubject(
      Number(body.userId),
      Number(body.studylevel),
      Number(body.firstUniversityId),
      Number(body.firstSubjectId),
      Number(body.secondUniversityId),
      Number(body.secondSubjectId),
      Number(body.thirdUniversityId),
      Number(body.thirdSubjectId),
    );

  if (!newMenteeTargetUniversitySubject) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    menteeTargetUniversitySubject: newMenteeTargetUniversitySubject,
  });
}

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
    menteeTargetUniversitySubject: menteeTargetUniversitySubjectByUserId,
  });
}
