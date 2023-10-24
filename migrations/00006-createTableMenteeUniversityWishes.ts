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
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    studylevel integer NOT NULL,
    first_university_id integer NOT NULL REFERENCES universities(id) ON UPDATE CASCADE,
    first_subject_id integer NOT NULL REFERENCES subjects(id) ON UPDATE CASCADE,
    second_university_id integer NOT NULL REFERENCES universities(id) ON UPDATE CASCADE,
    second_subject_id integer NOT NULL REFERENCES subjects(id) ON UPDATE CASCADE,
    third_university_id integer NOT NULL REFERENCES universities(id) ON UPDATE CASCADE,
    third_subject_id integer NOT NULL REFERENCES subjects(id) ON UPDATE CASCADE
);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentee_university_wishes
`;
}