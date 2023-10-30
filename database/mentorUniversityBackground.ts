import { cache } from 'react';
import { MentorUniversityBackground } from '../migrations/00005-createTableMentorUniversityBackgrounds';
import { sql } from './connect';

export const createMentorUniversityBackground = cache(
  async (
    userId: number,
    studyLevel: string,
    attendanceType: string,
    universityId: number,
    subjectId: number,
  ) => {
    const [user] = await sql<MentorUniversityBackground[]>`
      INSERT INTO mentor_university_backgrounds
        (user_id, studylevel, attendance_type, university_id, subject_id)
      VALUES
        (${userId}, ${studyLevel}, ${attendanceType}, ${universityId}, ${subjectId} )
      RETURNING
       *
    `;
    return user;
  },
);
