import { NextResponse } from 'next/server';
import {
  getUsersWithMenteeUniversityApplicationsbyUserIDWithUniAndSubject,
  menteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG,
} from '../../../../database/users';

// get user
type UserResponseBodyGet =
  | { users: menteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG[] }
  | {
      error: string;
    };

export async function GET(): Promise<NextResponse<UserResponseBodyGet>> {
  const users =
    await getUsersWithMenteeUniversityApplicationsbyUserIDWithUniAndSubject();

  return NextResponse.json({ users: users });
}
