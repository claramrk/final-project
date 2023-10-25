import { cache } from 'react';
import { sql } from '../database/connect';
import {
  UserIdEmailOnly,
  UserIdEmailPassword,
  UserIdEmailRole,
  UserPersonalInfo,
} from '../migrations/00004-createTableUsers';

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
  const [user] = await sql<UserIdEmailOnly[]>`
   SELECT
      users.id,
      users.email
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

export const updateUserById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    pronouns: string,
    phoneNumber: number,
    birthdate: Date,
    countryId: string,
  ) => {
    const [users] = await sql<User[]>`
      UPDATE
        users
      SET
        firstname = ${firstName},
        lastname = ${lastName},
        pronouns = ${pronouns},
        phone_number =${phoneNumber},
        birthdate =${birthdate},
        country_id =${countryId}

      WHERE id = ${id}
      RETURNING *
    `;
    return users;
  },
);

/*
export const setPersonalInfoToUser = cache(
  async (
    firstName: string,
    lastName: string,
    pronouns: string,
    phoneNumber: number,
    birthdate: Date,
    countryId: string,
  ) => {
    const [user] = await sql<UserPersonalInfo[]>`
      INSERT INTO users
        (firstname, lastname, pronouns, phone_Number, birthdate, country_id)
      VALUES
        (${firstName}, ${lastName}, ${pronouns}, ${phoneNumber},  ${birthdate}, ${countryId})
      RETURNING
        id,
        firstname,
        lastname,
        phone_number,
        birthdate,
        country_id
    `;
    return user;
  },
);
*/
