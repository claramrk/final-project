import { NextResponse } from 'next/server';
import {
  getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject,
  MentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG,
} from '../../../../database/users';

// get user
type UserResponseBodyGet =
  | { users: MentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG[] }
  | {
      error: string;
    };

export async function GET(): Promise<NextResponse<UserResponseBodyGet>> {
  const users =
    await getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject();

  return NextResponse.json({ users: users });
}
