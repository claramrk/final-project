import { cache } from 'react';
import { UserAll } from '../migrations/00008-createTableUsers';
import { sql } from './connect';

export const getMentorMatchingInfobyUserID = cache(async (userId: number) => {
  // return roles;
  const mentorMatchingInfoUsers = await sql<UserAll[]>`
    SELECT * FROM users
    WHERE
    id = ${userId}

  `;
  return mentorMatchingInfoUsers;
});

export const putMentorMatchingInfobyUserID = cache(
  async (userId: number, maxCapacity: number) => {
    // return roles;
    const mentorMatchingInfoUsers = await sql<UserAll[]>`
    UPDATE
    users
    SET
    max_capacity=${Number(maxCapacity)}
    WHERE
    id = ${userId}
    RETURNING *
  `;
    return mentorMatchingInfoUsers;
  },
);
