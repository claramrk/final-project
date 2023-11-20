import { cache } from 'react';
import { sql } from '../database/connect';
import { Role } from '../migrations/00006-createTableRoles';

export const getRoles = cache(async () => {
  // return roles;
  const roles = await sql<Role[]>`
    SELECT
      *
    FROM
      roles
  `;
  return roles;
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

/* export const getRoleById = cache(async (id: number) => {
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
}); */
