import { Sql } from 'postgres';

export type Match = {
  id: number;
  mentee_uinversity_wishes_id: number;
  mentor_university_background_id: number;
  request_date: Date;
  response_date: Date;
  respone: string;
  status_internal: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE matches(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    mentee_uinversity_wishes_id INTEGER NOT NULL,
    mentor_university_background_id INTEGER NOT NULL,
    request_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    response_date TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    response VARCHAR(255) NULL,
    status_internal VARCHAR(255) NOT NULL);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE matches
`;
}
