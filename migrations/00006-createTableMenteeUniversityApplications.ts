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
    first_university_id integer NOT NULL REFERENCES universities(id),
    first_subject_id integer NOT NULL REFERENCES subjects(id),
    second_university_id integer NOT NULL REFERENCES universities(id),
    second_subject_id integer NOT NULL REFERENCES subjects(id),
    third_university_id integer NOT NULL REFERENCES universities(id),
    third_subject_id integer NOT NULL REFERENCES subjects(id)
);`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentee_university_applications
`;
}
