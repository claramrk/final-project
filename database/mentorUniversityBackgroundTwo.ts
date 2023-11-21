import { cache } from 'react';
import { MentorUniversityBackground } from '../migrations/00011-createTableMentorUniversityBackgrounds';
import { sql } from './connect';

type JsonAgg = MentorUniversityBackground[];

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
  });
