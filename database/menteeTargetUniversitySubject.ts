import { cache } from 'react';
import { MenteeTargetUniversitySubject } from '../migrations/00013-createTableMenteeUniversityApplications';
import { sql } from './connect';

export const createMenteeTargetUniversitySubject = cache(
  async (
    userId: number,
    studylevel: number,
    firstUniversityId: number,
    firstSubjectId: number,
    secondUniversityId: number,
    secondSubjectId: number,
    thirdUniversityId: number,
    thirdSubjectId: number,
  ) => {
    const [user] = await sql<MenteeTargetUniversitySubject[]>`
      INSERT INTO mentee_university_applications
        (user_id, studylevel, first_university_id, first_subject_id, second_university_id, second_subject_id, third_university_id, third_subject_id)
      VALUES
        (${Number(userId)}, ${Number(studylevel)}, ${Number(
      firstUniversityId,
    )}, ${Number(firstSubjectId)}, ${Number(secondUniversityId)}, ${Number(
      secondSubjectId,
    )}, ${Number(thirdUniversityId)}, ${Number(thirdSubjectId)} )
      RETURNING
       *
    `;
    return user;
  },
);

export const getMenteeTargetUniversitySubjectbyUserID = cache(
  async (userId: number) => {
    // return roles;
    const menteeTargetUniversitySubjectUsers = await sql<
      MenteeTargetUniversitySubject[]
    >`
    SELECT * FROM mentee_university_applications
    WHERE
    user_id = ${userId}

  `;
    return menteeTargetUniversitySubjectUsers;
  },
);
