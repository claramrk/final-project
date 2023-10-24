import { Sql } from 'postgres';

export type Match = {
  id: number;
  mentee_university_wish_id: number;
  mentor_university_backgrounds_id: number;
  request_date: Date;
  response_date: Date;
  respone: string;
  status_internal: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE matches(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    mentee_university_wish_id INTEGER NOT NULL REFERENCES mentee_university_wishes(id) ON DELETE CASCADE,
    mentor_university_background_id INTEGER NOT NULL REFERENCES mentor_university_backgrounds(id) ON DELETE CASCADE,
    request_date TIMESTAMP NOT NULL,
    response_date TIMESTAMP NULL,
    response VARCHAR(255) NULL,
    status_internal VARCHAR(255) NOT NULL);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE matches
`;
}
