import { Sql } from 'postgres';

export type MenteeTargetUniversitySubject = {
  id: number;
  userId: number;
  studylevel: number;
  firstUniversityId: number;
  firstSubjectId: number;
  secondUniversityId: number;
  secondSubjectId: number;
  thirdUniversityId: number;
  thirdSubjectId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE mentee_university_applications(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users(id),
    studylevel integer NOT NULL,
    first_university_id integer NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    first_subject_id integer NOT NULL REFERENCES subjects(id)  ON DELETE CASCADE,
    second_university_id integer NOT NULL REFERENCES universities(id)  ON DELETE CASCADE,
    second_subject_id integer NOT NULL REFERENCES subjects(id)  ON DELETE CASCADE,
    third_university_id integer NOT NULL REFERENCES universities(id)  ON DELETE CASCADE,
    third_subject_id integer NOT NULL REFERENCES subjects(id)  ON DELETE CASCADE
);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentee_university_applications CASCADE
`;
}
