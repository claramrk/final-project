import { Sql } from 'postgres';

export type Country = {
  id: number;
  name: string;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE countries (
    id integer GENERATED ALWAYS AS IDENTITY,
      name varchar(255) PRIMARY KEY NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE countries
`;
}
