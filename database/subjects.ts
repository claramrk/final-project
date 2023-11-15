import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Subject } from '../migrations/00002-createTableSubjects';

export const getSubjects = cache(async () => {
  // return subjects;
  const subjects = await sql<Subject[]>`
    SELECT
      *
    FROM
      subjects
  `;
  return subjects;
});

export const getSubjectById = cache(async (id: number) => {
  // Postgres returns an array
  const [subject] = await sql<Subject[]>`
    SELECT
      *
    FROM
      subjects
    WHERE
      id = ${id}
  `;
  return subject;
});
