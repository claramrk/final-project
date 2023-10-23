import { Sql } from 'postgres';

export type MenteeUniversityWishes = {
  id: number;
  user_id: number;
  studylevel: number;
  university_ids: number;
  subject_ids: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE mentee_university_wishes(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES user(id),
    studylevel INTEGER NOT NULL ,
    university_ids INTEGER NOT NULL REFERENCES universities(id),
    subject_ids INTEGER NOT NULL REFERENCES subjects(id)
);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentee_university_wishes
`;
}
