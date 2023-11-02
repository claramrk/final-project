import { Sql } from 'postgres';

const mentorUniversityBackgroundList = [];

for (let id = 1; id <= 30; id++) {
  const userId = id;
  const studylevel = Math.floor(Math.random() * 3) + 1; // Randomly choose between 1, 2, or 3
  const attendanceType = Math.floor(Math.random() * 3) + 1; // Randomly choose between 1, 2, or 3
  const universityId = Math.floor(Math.random() * 33) + 1; // Randomly choose between 1 to 33
  const subjectId = Math.floor(Math.random() * 93) + 1; // Randomly choose between 1 to 93

  mentorUniversityBackgroundList.push({
    id: id,
    userId: userId,
    studylevel: studylevel.toString(),
    attendanceType: attendanceType.toString(),
    universityId: universityId,
    subjectId: subjectId,
  });
}

export async function up(sql: Sql) {
  for (const mentorUniversityBackground of mentorUniversityBackgroundList) {
    await sql`
  INSERT INTO mentor_university_backgrounds (
    email, password_hash, firstname, lastname, pronouns, phone_number, birthdate, country_id, role_id)
    VALUES
    (${user.email}, ${user.password_hash}, ${user.firstname}, ${user.lastname}, ${user.pronouns}, ${user.phone_number}, ${user.birthdate}, ${user.country_id}, ${user.role_id})
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
