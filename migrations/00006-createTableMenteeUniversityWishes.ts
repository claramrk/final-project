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
    user_id INTEGER NOT NULL REFERENCES users(id),
    studylevel INTEGER NOT NULL,
    first_university_id INTEGER NOT NULL REFERENCES universities(id),
    first_subject_id INTEGER NOT NULL REFERENCES subjects(id),
    second_university_id INTEGER NOT NULL REFERENCES universities(id),
    second_subject_id INTEGER NOT NULL REFERENCES subjects(id),
    third_university_id INTEGER NOT NULL REFERENCES universities(id),
    third_subject_id INTEGER NOT NULL REFERENCES subjects(id)
);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentee_university_wishes
`;
}
