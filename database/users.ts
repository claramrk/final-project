import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00004-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type UserRegister = { id: number; email: string; roleId: number };

export type UserLogin = { id: number; email: string };

export const createUser = cache(
  async (email: string, passwordHash: string, roleId: number) => {
    const [user] = await sql<UserRegister[]>`
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
  const [user] = await sql<UserLogin[]>`
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
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});