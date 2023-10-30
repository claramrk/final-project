import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Role } from '../migrations/00003-createTableRoles';

export const getRoles = cache(async () => {
  // return roles;
  const roles = await sql<Role[]>`
    SELECT * FROM roles
  `;
  return roles;
});

export const getRoleById = cache(async (id: number) => {
  // Postgres returns an array
  const [role] = await sql<Role[]>`
    SELECT
      *
    FROM
      roles
    WHERE
      id = ${id}
  `;
  return role;
});

export const getRoleByName = cache(async (name: string) => {
  // Postgres returns an array
  const [role] = await sql<Role[]>`
    SELECT
      *
    FROM
      roles
    WHERE
      name = ${name}
  `;
  return role;
});
