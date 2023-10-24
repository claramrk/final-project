import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { University } from '../migrations/00002-createTableUniversities';

export const getUniversities = cache(async () => {
  // return universities;
  const universities = await sql<University[]>`
    SELECT * FROM universities
  `;
  return universities;
});

export const getUniversityById = cache(async (id: number) => {
  // Postgres returns an array
  const [university] = await sql<University[]>`
    SELECT
      *
    FROM
      universities
    WHERE
      id = ${id}
  `;
  return university;
});
