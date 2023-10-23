import { Sql } from 'postgres';

export type Subject = {
  id: number;
  name: string;
  discipline: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE subjects (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      discipline varchar (30) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE subjects
`;
}
