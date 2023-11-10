import { Sql } from 'postgres';
import { University } from './00004-createTableUniversities';

export type MentorUniversityBackground = {
  id: number;
  userId: number;
  studylevel: number;
  attendanceType: number;
  universityId: number;
  subjectId: number;
};

type JsonAgg = University[];

export type MentorUniversityBackgroundWithUniversity =
  MentorUniversityBackground & {
    mentorUniversityBackgroundsUniversity: JsonAgg | null;
  };

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE  mentor_university_backgrounds(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    studylevel integer NOT NULL,
    attendance_type integer NOT NULL,
    university_id integer NOT NULL REFERENCES universities(id)  ON DELETE CASCADE,
    subject_id integer NOT NULL REFERENCES subjects(id)  ON DELETE CASCADE
);
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentor_university_backgrounds
`;
}
