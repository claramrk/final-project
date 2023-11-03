import { Sql } from 'postgres';

const menteeUniversityApplicationsList = [
  {
    id: 1,
    userId: 10,
    studylevel: 1,
    firstUniversityId: 19,
    secondUniversityId: 8,
    thirdUniversityId: 13,
    firstSubjectId: 36,
    secondSubjectId: 79,
    thirdSubjectId: 25,
  },
  {
    id: 2,
    userId: 11,
    studylevel: 1,
    firstUniversityId: 11,
    secondUniversityId: 9,
    thirdUniversityId: 6,
    firstSubjectId: 61,
    secondSubjectId: 76,
    thirdSubjectId: 51,
  },
  {
    id: 3,
    userId: 12,
    studylevel: 2,
    firstUniversityId: 5,
    secondUniversityId: 7,
    thirdUniversityId: 14,
    firstSubjectId: 53,
    secondSubjectId: 66,
    thirdSubjectId: 35,
  },
  {
    id: 4,
    userId: 13,
    studylevel: 2,
    firstUniversityId: 20,
    secondUniversityId: 2,
    thirdUniversityId: 28,
    firstSubjectId: 64,
    secondSubjectId: 63,
    thirdSubjectId: 68,
  },
  {
    id: 5,
    userId: 14,
    studylevel: 3,
    firstUniversityId: 8,
    secondUniversityId: 23,
    thirdUniversityId: 30,
    firstSubjectId: 25,
    secondSubjectId: 12,
    thirdSubjectId: 54,
  },
  {
    id: 6,
    userId: 15,
    studylevel: 3,
    firstUniversityId: 16,
    secondUniversityId: 1,
    thirdUniversityId: 17,
    firstSubjectId: 79,
    secondSubjectId: 55,
    thirdSubjectId: 57,
  },
  {
    id: 7,
    userId: 16,
    studylevel: 1,
    firstUniversityId: 21,
    secondUniversityId: 18,
    thirdUniversityId: 10,
    firstSubjectId: 8,
    secondSubjectId: 3,
    thirdSubjectId: 59,
  },
  {
    id: 8,
    userId: 17,
    studylevel: 2,
    firstUniversityId: 22,
    secondUniversityId: 31,
    thirdUniversityId: 26,
    firstSubjectId: 48,
    secondSubjectId: 69,
    thirdSubjectId: 41,
  },
  {
    id: 9,
    userId: 18,
    studylevel: 3,
    firstUniversityId: 2,
    secondUniversityId: 4,
    thirdUniversityId: 27,
    firstSubjectId: 50,
    secondSubjectId: 9,
    thirdSubjectId: 20,
  },
  {
    id: 10,
    userId: 19,
    studylevel: 1,
    firstUniversityId: 32,
    secondUniversityId: 12,
    thirdUniversityId: 24,
    firstSubjectId: 67,
    secondSubjectId: 29,
    thirdSubjectId: 34,
  },
  // Add more objects as needed.
];

export async function up(sql: Sql) {
  for (const menteeUniversityApplications of menteeUniversityApplicationsList) {
    await sql`
  INSERT INTO mentee_university_applications (
    user_id, studylevel, first_university_id, first_subject_id, second_university_id, second_subject_id,third_university_id, third_subject_id)
    VALUES
    (${menteeUniversityApplications.userId}, ${menteeUniversityApplications.studylevel}, ${menteeUniversityApplications.firstUniversityId}, ${menteeUniversityApplications.firstSubjectId}, ${menteeUniversityApplications.secondUniversityId}, ${menteeUniversityApplications.secondSubjectId}, ${menteeUniversityApplications.thirdUniversityId}, ${menteeUniversityApplications.thirdSubjectId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const menteeUniversityApplications of menteeUniversityApplicationsList) {
    await sql`
      DELETE FROM mentee_university_applications WHERE id = ${menteeUniversityApplications.id}
`;
  }
}
