import { Sql } from 'postgres';

export type MentorUniversityBackground = {
  id: number;
  userId: number;
  studylevel: string;
  attendanceType: string;
  universityId: number;
  subjectId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE  mentor_university_backgrounds(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    studylevel varchar(255) NOT NULL,
    attendance_type varchar(255) NOT NULL,
    university_id INTEGER NOT NULL REFERENCES universities(id) ON UPDATE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON UPDATE CASCADE
);
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE mentor_university_backgrounds
`;
}
