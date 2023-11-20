import { cache } from 'react';
import { MentorUniversityBackground } from '../migrations/00011-createTableMentorUniversityBackgrounds';
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
      INSERT INTO
        mentor_university_backgrounds (
          user_id,
          studylevel,
          attendance_type,
          university_id,
          subject_id
        )
      VALUES
        (
          ${Number(userId)},
          ${Number(studylevel)},
          ${Number(attendanceType)},
          ${Number(universityId)},
          ${Number(subjectId)}
        ) RETURNING *
    `;
    return user;
  },
);

export const getMentorUniversityBackgroundbyUserID = cache(
  async (userId: number) => {
    const mentorUniversityBackgroundUsers = await sql<
      MentorUniversityBackground[]
    >`
      SELECT
        *
      FROM
        mentor_university_backgrounds
      WHERE
        user_id = ${userId}
    `;
    return mentorUniversityBackgroundUsers;
  },
);



export type MentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin = {
  id: number;
  userId: number;
  studylevel: number;
  attendanceType: number;
  universityName: string;
  universityCountryId: string;
  subjectName: string;
  subjectDiscipline: string;
};

export const getMentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin =
  cache(async (userId: number) => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
    MentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin[]
    >`
      SELECT
        mentor_university_backgrounds.id,
        mentor_university_backgrounds.user_id,
        mentor_university_backgrounds.studylevel,
        mentor_university_backgrounds.attendance_type,
        universities.name AS university_name,
        universities.country_id AS university_country_id,
        subjects.name AS subject_name,
        subjects.discipline AS subject_discipline
      FROM
        mentor_university_backgrounds
        INNER JOIN universities ON mentor_university_backgrounds.university_id = universities.id
        INNER JOIN subjects ON mentor_university_backgrounds.subject_id = subjects.id
      WHERE
        user_id = ${userId}
    `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  });


/*   export const getMentorUniversityBackgroundbyUserIDWithUniAndSubject = cache(
    async (userId: number) => {
      const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
        MentorUniversityBackgroundWithUniversity[]
      >`
        SELECT
          *,
          (
            SELECT
              json_agg (
                universities.*
              )
            FROM
              universities
            WHERE
              mentor_university_backgrounds.university_id = universities.id
          ) AS mentor_university_backgrounds_university
        FROM
          mentor_university_backgrounds
        WHERE
          user_id = ${userId}
      `;
      return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
    },
  ); */
