import { cache } from 'react';
import { Country } from '../migrations/00000-createTableCountries';
import { Subject } from '../migrations/00002-createTableSubjects';
import { University } from '../migrations/00004-createTableUniversities';
import { UserAll } from '../migrations/00008-createTableUsers';
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

export type JsonAgg = {
  rowtoJson: {
    subjects: Subject;
    universies: University;
    mentor_university_backgrounds: MentorUniversityBackground[];
    countries: Country;
    users: UserAll;
  };
};
/*
export type MentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG = {
  usersId: number;
  usersRoleId: number;
  usersCountryId: string | null;
  usersMaxCapacity: number | null;
  userMentorUniversityBackgrounds: JsonAgg | null;
};

export const getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject =
  cache(async () => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      MentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG[]
    >`
      SELECT
        users.id AS users_id,
        users.role_id AS users_role_id,
        users.country_id AS users_country_id,
        users.max_capacity AS users_max_capacity,
        (
          SELECT
            json_agg (
              mentor_university_backgrounds.*
            )
          FROM
            mentor_university_backgrounds
          WHERE
            mentor_university_backgrounds.user_id = users.id
        ) AS user_mentor_university_backgrounds
      FROM
        users
        INNER JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
      GROUP BY
        users.id
    `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  }); */

export type SingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW =
  { rowToJson: JsonAgg | null };

export const getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW =
  cache(async (id: number) => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      SingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW[]
    >`
      WITH
        subjects AS (
          SELECT
            subjects.*
          FROM
            subjects
          GROUP BY
            subjects.id
          ORDER BY
            subjects.id
        ),
        universities AS (
          SELECT
            universities.*
          FROM
            universities
          GROUP BY
            universities.id
          ORDER BY
            universities.id
        ),
        mentor_university_backgrounds AS (
          SELECT
            mentor_university_backgrounds.*,
            json_agg (
              universities
            ) AS universities,
            json_agg (
              subjects
            ) AS subjects
          FROM
            mentor_university_backgrounds
            LEFT JOIN universities ON universities.id = mentor_university_backgrounds.university_id
            LEFT JOIN subjects ON subjects.id = mentor_university_backgrounds.subject_id
          GROUP BY
            mentor_university_backgrounds.id
          ORDER BY
            mentor_university_backgrounds.id
        ),
        countries AS (
          SELECT
            countries.*
          FROM
            countries
        ),
        users AS (
          SELECT
            users.*,
            json_agg (
              mentor_university_backgrounds
            ) AS mentor_university_backgrounds,
            json_agg (
              countries
            ) AS countries
          FROM
            users
            LEFT JOIN countries ON countries.id = users.country_id
            LEFT JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
          WHERE
            users.id = ${id}
          GROUP BY
            users.id
          ORDER BY
            users.id
        )
      SELECT
        row_to_json (
          users
        )
      FROM
        users;
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
