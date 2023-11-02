import { Sql } from 'postgres';

export type University = {
  id: number;
  name: string;
  countryId: string;
  abbreviation: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE universities (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NOT NULL,
      country_id varchar(255) NOT NULL REFERENCES countries(id),
abbreviation varchar(30) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE universities
`;
}
