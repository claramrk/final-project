import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Country } from '../migrations/00000-createTableCountries';

export const getCountries = cache(async () => {
  // return roles;
  const countries = await sql<Country[]>`
    SELECT * FROM countries
  `;
  return countries;
});

export const getCountryById = cache(async (id: string) => {
  // Postgres returns an array
  const [country] = await sql<Country[]>`
    SELECT
      *
    FROM
      countries
    WHERE
      id = ${id}
  `;
  return country;
});
