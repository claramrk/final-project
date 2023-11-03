import { Sql } from 'postgres';

const mentorUniversityBackgroundList = [
  {
    id: 1,
    userId: 1,
    studylevel: 2,
    attendanceType: 3,
    universityId: 16,
    subjectId: 75,
  },
  {
    id: 2,
    userId: 2,
    studylevel: 3,
    attendanceType: 1,
    universityId: 6,
    subjectId: 57,
  },
  {
    id: 3,
    userId: 3,
    studylevel: 1,
    attendanceType: 3,
    universityId: 13,
    subjectId: 15,
  },
  {
    id: 4,
    userId: 4,
    studylevel: 1,
    attendanceType: 2,
    universityId: 21,
    subjectId: 38,
  },
  {
    id: 5,
    userId: 5,
    studylevel: 2,
    attendanceType: 1,
    universityId: 18,
    subjectId: 82,
  },
  {
    id: 6,
    userId: 6,
    studylevel: 3,
    attendanceType: 1,
    universityId: 10,
    subjectId: 30,
  },
  {
    id: 7,
    userId: 7,
    studylevel: 2,
    attendanceType: 2,
    universityId: 30,
    subjectId: 45,
  },
  {
    id: 8,
    userId: 8,
    studylevel: 1,
    attendanceType: 3,
    universityId: 23,
    subjectId: 70,
  },
  {
    id: 9,
    userId: 9,
    studylevel: 2,
    attendanceType: 2,
    universityId: 14,
    subjectId: 3,
  },
  {
    id: 10,
    userId: 1,
    studylevel: 3,
    attendanceType: 2,
    universityId: 2,
    subjectId: 47,
  },
  {
    id: 11,
    userId: 2,
    studylevel: 1,
    attendanceType: 3,
    universityId: 17,
    subjectId: 36,
  },
  {
    id: 12,
    userId: 3,
    studylevel: 3,
    attendanceType: 1,
    universityId: 28,
    subjectId: 85,
  },
  {
    id: 13,
    userId: 4,
    studylevel: 2,
    attendanceType: 2,
    universityId: 7,
    subjectId: 31,
  },
  {
    id: 14,
    userId: 5,
    studylevel: 1,
    attendanceType: 3,
    universityId: 25,
    subjectId: 89,
  },
  {
    id: 15,
    userId: 6,
    studylevel: 2,
    attendanceType: 1,
    universityId: 8,
    subjectId: 51,
  },
  {
    id: 16,
    userId: 7,
    studylevel: 3,
    attendanceType: 1,
    universityId: 33,
    subjectId: 71,
  },
  {
    id: 17,
    userId: 8,
    studylevel: 2,
    attendanceType: 2,
    universityId: 26,
    subjectId: 79,
  },
  {
    id: 18,
    userId: 9,
    studylevel: 1,
    attendanceType: 3,
    universityId: 24,
    subjectId: 41,
  },
  {
    id: 19,
    userId: 1,
    studylevel: 1,
    attendanceType: 2,
    universityId: 27,
    subjectId: 34,
  },
  {
    id: 20,
    userId: 2,
    studylevel: 3,
    attendanceType: 3,
    universityId: 11,
    subjectId: 65,
  },
  {
    id: 21,
    userId: 3,
    studylevel: 1,
    attendanceType: 1,
    universityId: 3,
    subjectId: 61,
  },
  {
    id: 22,
    userId: 4,
    studylevel: 3,
    attendanceType: 1,
    universityId: 4,
    subjectId: 21,
  },
  {
    id: 23,
    userId: 5,
    studylevel: 2,
    attendanceType: 2,
    universityId: 19,
    subjectId: 63,
  },
  {
    id: 24,
    userId: 6,
    studylevel: 1,
    attendanceType: 3,
    universityId: 12,
    subjectId: 46,
  },
  {
    id: 25,
    userId: 7,
    studylevel: 1,
    attendanceType: 1,
    universityId: 31,
    subjectId: 67,
  },
  {
    id: 26,
    userId: 8,
    studylevel: 2,
    attendanceType: 3,
    universityId: 15,
    subjectId: 64,
  },
  {
    id: 27,
    userId: 9,
    studylevel: 3,
    attendanceType: 2,
    universityId: 9,
    subjectId: 4,
  },
  {
    id: 28,
    userId: 1,
    studylevel: 2,
    attendanceType: 1,
    universityId: 22,
    subjectId: 32,
  },
  {
    id: 29,
    userId: 2,
    studylevel: 1,
    attendanceType: 3,
    universityId: 5,
    subjectId: 5,
  },
  {
    id: 30,
    userId: 3,
    studylevel: 3,
    attendanceType: 1,
    universityId: 1,
    subjectId: 78,
  },
];

export async function up(sql: Sql) {
  for (const mentorUniversityBackground of mentorUniversityBackgroundList) {
    await sql`
  INSERT INTO mentor_university_backgrounds (
    user_id, studylevel, attendance_type, university_id, subject_id)
    VALUES
    (${mentorUniversityBackground.userId}, ${mentorUniversityBackground.studylevel}, ${mentorUniversityBackground.attendanceType}, ${mentorUniversityBackground.universityId}, ${mentorUniversityBackground.subjectId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const mentorUniversityBackground of mentorUniversityBackgroundList) {
    await sql`
      DELETE FROM mentor_university_backgrounds WHERE id = ${mentorUniversityBackground.id}
`;
  }
}
