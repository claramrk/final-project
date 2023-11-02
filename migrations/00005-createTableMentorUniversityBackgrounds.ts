import { Sql } from 'postgres';
import { University } from './00002-createTableUniversities';

export type MentorUniversityBackground = {
  id: number;
  userId: number;
  studylevel: string;
  attendanceType: string;
  universityId: number | null;
  subjectId: number | null;
};

type JsonAgg = University[];

export type MentorUniversityBackgroundWithUniversity = {
  id: number;
  userId: number;
  studylevel: string;
  attendanceType: string;
  universityId: number | null;
  subjectId: number | null;
  mentorUniversityBackgroundsUniversity: JsonAgg | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE  mentor_university_backgrounds(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    studylevel varchar(255) NOT NULL,
    attendance_type varchar(255) NOT NULL,
    university_id INTEGER REFERENCES universities(id) ,
    subject_id INTEGER REFERENCES subjects(id)
);
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentor_university_backgrounds
`;
}
