import { cache } from 'react';
import { MentorUniversityBackground } from '../migrations/00005-createTableMentorUniversityBackgrounds';
import { sql } from './connect';

export const createMentorUniversityBackground = cache(
  async (
    userId: number,
    studyLevel: string,
    attendanceType: string,
    universityId: number,
    subjectId: number,
  ) => {
    const [user] = await sql<MentorUniversityBackground[]>`
      INSERT INTO mentor_university_backgrounds
        (user_id, studylevel, attendance_type, university_id, subject_id)
      VALUES
        (${Number(userId)}, ${Number(studyLevel)}, ${Number(
      attendanceType,
    )}, ${Number(universityId)}, ${Number(subjectId)} )
      RETURNING
       *
    `;
    return user;
  },
);

export const getMentorUniversityBackgroundbyUserID = cache(
  async (userId: number) => {
    // return roles;
    const mentorUniversityBackgroundUsers = await sql<
      MentorUniversityBackground[]
    >`
    SELECT * FROM mentor_university_backgrounds
    WHERE
    user_id = ${userId}

  `;
    return mentorUniversityBackgroundUsers;
  },
);
