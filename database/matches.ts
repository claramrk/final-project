import { cache } from 'react';
import { Match } from '../migrations/00007-createTableMatches';
import { sql } from './connect';

export const createMatchRequest = cache(
  async (
    menteeUserId: number,
    mentorUserId: number,
    messageToMentor: string,
    statusInternal: string,
  ) => {
    const [match] = await sql<Match[]>`
      INSERT INTO matches
        (mentee_user_id, mentor_user_id,  message_to_mentor,status_internal)
      VALUES
        (${menteeUserId}, ${mentorUserId}, ${messageToMentor}, ${statusInternal})
      RETURNING
     *
    `;
    return match;
  },
);
/*

export const getAllMatches = cache(async () => {
  const matches = await sql<MatchAll[]>`
    SELECT
      *
    FROM
      matches

  `;
  return matches;
});

export const getMatchById = cache(async (id: number) => {
  const [match] = await sql<MatchAll[]>`
    SELECT
     *
    FROM
      matches
    WHERE
      id = ${id}
  `;
  return match;
});
 */
