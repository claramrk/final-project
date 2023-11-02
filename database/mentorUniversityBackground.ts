import { cache } from 'react';
import {
  MentorUniversityBackground,
  MentorUniversityBackgroundWithUniversity,
} from '../migrations/00005-createTableMentorUniversityBackgrounds';
import { sql } from './connect';

export const createMentorUniversityBackground = cache(
  async (
    userId: number,
    studylevel: string,
    attendanceType: string,
    universityId: number,
    subjectId: number,
  ) => {
    const [user] = await sql<MentorUniversityBackground[]>`
      INSERT INTO mentor_university_backgrounds
        (user_id, studylevel, attendance_type, university_id, subject_id)
      VALUES
        (${Number(userId)}, ${Number(studylevel)}, ${Number(
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

export const getMentorUniversityBackgroundbyUserIDWithUniAndSubject = cache(
  async () => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      MentorUniversityBackgroundWithUniversity[]
    >`
      SELECT
*,      (
        SELECT
          json_agg (
            universities.*
             )
        FROM
          universities
        WHERE
        mentor_university_backgrounds.university_id = universities.id
      )
      AS mentor_university_backgrounds_university
    FROM
    mentor_university_backgrounds
      GROUP BY
      mentor_university_backgrounds.id

  `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  },
);
