import { Sql } from 'postgres';

export type University = {
  id: number;
  name: string;
  country: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE universities (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      country integer NOT NULL,
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE universities
`;
}
