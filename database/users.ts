import { cache } from 'react';
import {
  UserAll,
  UserAllWithMatching,
  UserIdEmailOnly,
  UserIdEmailPassword,
  UserIdEmailRole,
} from '../migrations/00004-createTableUsers';
import { MentorUniversityBackground } from '../migrations/00005-createTableMentorUniversityBackgrounds';
import { sql } from './connect';

export const createUser = cache(
  async (email: string, passwordHash: string, roleId: number) => {
    const [user] = await sql<UserIdEmailRole[]>`
      INSERT INTO users
        (email, password_hash, role_id)
      VALUES
        (${email.toLowerCase()}, ${passwordHash}, ${roleId})
      RETURNING
        id,
        email,
        role_id
    `;
    return user;
  },
);

export const getUserByEmail = cache(async (email: string) => {
  const [user] = await sql<UserIdEmailOnly[]>`
    SELECT
      id,
      email
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

export const getAllUsers = cache(async () => {
  const [users] = await sql<UserAll[]>`
    SELECT
      *
    FROM
      users

  `;
  return users;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<UserAll[]>`
    SELECT
     *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserWithPasswordHashByEmail = cache(async (email: string) => {
  const [user] = await sql<UserIdEmailPassword[]>`
    SELECT
      id, email, password_hash
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<UserAll[]>`
   SELECT
    users.id,
    users.email,
    users.password_hash,
    users.firstname,
    users.lastname,
    users.pronouns,
    users.phone_number,
    users.birthdate,
    users.country_id,
    users.photo,
    users.role_id,
    users.last_activity,
    users.last_update,
    users.pause_until,
    users.max_capacity,
    users.contract_doc_url

    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const putUserRole = cache(async (userId: number, roleId: number) => {
  // return roles;
  const user = await sql<UserAll[]>`
    UPDATE
    users
    SET
   role_id=${Number(roleId)}
    WHERE
    id = ${userId}
    RETURNING *
  `;
  return user;
});

export const putPersonalDataByUserID = cache(
  async (
    userId: number,
    firstname: string,
    lastname: string,
    pronouns: string,
    phoneNumber: number,
    birthdate: Date,
    countryId: string,
  ) => {
    // return roles;
    const personalDataInfoUsers = await sql<UserAll[]>`
    UPDATE
    users
    SET
    firstname=${firstname},
    lastname=${lastname},
    pronouns=${pronouns},
    phone_number=${phoneNumber},
    birthdate=${birthdate},
    country_id=${countryId}


    WHERE
    id = ${userId}
    RETURNING *
  `;
    return personalDataInfoUsers;
  },
);

export const getUserWithMatchingInfoByIDInArray = cache(async () => {
  const usersMatchings = await sql<UserAllWithMatching[]>`
      SELECT
*,      (
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
      GROUP BY
      users.id

  `;
  return usersMatchings;
});

export const getUserWithMatchingInfoByIDInArrayWithUni = cache(async () => {
  const usersMatchings = await sql<UserAllWithMatching[]>`
      SELECT
*,      (
        SELECT
          json_agg (
            mentor_university_backgrounds.*
             )
        FROM
          mentor_university_backgrounds
        WHERE
        mentor_university_backgrounds.user_id = users.id
      )
      AS user_mentor_university_backgrounds
    FROM
      users
      GROUP BY
      users.id

  `;
  return usersMatchings;
});
