import { cache } from 'react';
import { MenteeTargetUniversitySubject } from '../migrations/00013-createTableMenteeUniversityApplications';
import { sql } from './connect';

export const createMenteeTargetUniversitySubject = cache(
  async (
    userId: number,
    studylevel: number,
    firstUniversityId: number,
    firstSubjectId: number,
    secondUniversityId: number,
    secondSubjectId: number,
    thirdUniversityId: number,
    thirdSubjectId: number,
  ) => {
    const [user] = await sql<MenteeTargetUniversitySubject[]>`
      INSERT INTO
        mentee_university_applications (
          user_id,
          studylevel,
          first_university_id,
          first_subject_id,
          second_university_id,
          second_subject_id,
          third_university_id,
          third_subject_id
        )
      VALUES
        (
          ${Number(userId)},
          ${Number(studylevel)},
          ${Number(firstUniversityId)},
          ${Number(firstSubjectId)},
          ${Number(secondUniversityId)},
          ${Number(secondSubjectId)},
          ${Number(thirdUniversityId)},
          ${Number(thirdSubjectId)}
        ) RETURNING *
    `;
    return user;
  },
);

export const getMenteeTargetUniversitySubjectbyUserID = cache(
  async (userId: number) => {
    // return roles;
    const menteeTargetUniversitySubjectUsers = await sql<
      MenteeTargetUniversitySubject[]
    >`
      SELECT
        *
      FROM
        mentee_university_applications
      WHERE
        user_id = ${userId}
    `;
    return menteeTargetUniversitySubjectUsers;
  },
);

export const putMenteeBestMentorMatches = cache(
  async (userId: number, mentorMatches: number[]) => {
    // return roles;
    const menteeBestMentorMatches = await sql<MenteeTargetUniversitySubject[]>`
      UPDATE mentee_university_applications
      SET
        best_mentor_matches = ${mentorMatches}
      WHERE
        user_id = ${userId} RETURNING *
    `;
    return menteeBestMentorMatches;
  },
);

type JsonAgg = MenteeTargetUniversitySubject[];

export type MenteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG = {
  usersId: number;
  usersRoleId: number;
  usersCountryId: string | null;
  userMenteeUniversityApplications: JsonAgg | null;
};

export const getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject =
  cache(async (id: number) => {
    const [menteeUniversityApplicationsbyUserIDWithUniAndSubject] = await sql<
      MenteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG[]
    >`
      SELECT
        users.id AS users_id,
        users.role_id AS users_role_id,
        users.country_id AS users_country_id,
        (
          SELECT
            json_agg (
              mentee_university_applications.*
            )
          FROM
            mentee_university_applications
          WHERE
            mentee_university_applications.user_id = users.id
        ) AS user_mentee_university_applications
      FROM
        users
        INNER JOIN mentee_university_applications ON mentee_university_applications.user_id = users.id
      WHERE
        users.id = ${id}
    `;
    return menteeUniversityApplicationsbyUserIDWithUniAndSubject;
  });

/* export const getMenteeBestMentorMatchesById = cache(async (userId: number) => {
  // return roles;
  const [menteeBestMentorMatches] = await sql<
    { bestMentorMatches: number[] | null }[]
  >`
    SELECT
      best_mentor_matches
    FROM
      mentee_university_applications
    WHERE
      user_id = ${userId}
  `;
  return menteeBestMentorMatches;
});
 */
