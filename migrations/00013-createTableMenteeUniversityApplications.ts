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
  bestMentorMatches: number[] | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      mentee_university_applications (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id),
        studylevel INTEGER NOT NULL,
        first_university_id INTEGER NOT NULL REFERENCES universities (id) ON DELETE CASCADE,
        first_subject_id INTEGER NOT NULL REFERENCES subjects (id) ON DELETE CASCADE,
        second_university_id INTEGER NOT NULL REFERENCES universities (id) ON DELETE CASCADE,
        second_subject_id INTEGER NOT NULL REFERENCES subjects (id) ON DELETE CASCADE,
        third_university_id INTEGER NOT NULL REFERENCES universities (id) ON DELETE CASCADE,
        third_subject_id INTEGER NOT NULL REFERENCES subjects (id) ON DELETE CASCADE,
        best_mentor_matches integer[]
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE mentee_university_applications CASCADE `;
}
