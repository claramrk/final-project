import { cache } from 'react';
import { Match } from '../migrations/00015-createTableMatches';
import { sql } from './connect';

export const createMatchRequest = cache(
  async (
    menteeUserId: number,
    mentorUserId: number,
    messageToMentor: string,
    statusInternal: string,
  ) => {
    const [match] = await sql<Match[]>`
      INSERT INTO
        matches (
          mentee_user_id,
          mentor_user_id,
          request_expiry,
          message_to_mentor,
          status_internal
        )
      VALUES
        (
          ${menteeUserId},
          ${mentorUserId},
          CURRENT_TIMESTAMP(2),
          ${messageToMentor},
          ${statusInternal}
        ) RETURNING *
    `;
    return match;
  },
);

export const getMatchesByMentorId = cache(async (id: number) => {
  const matches = await sql<Match[]>`
    SELECT
      *
    FROM
      matches
    WHERE
      mentor_user_id = ${Number(id)}
  `;
  return matches;
});

export const getMatchesByMenteeId = cache(async (id: number) => {
  const matches = await sql<Match[]>`
    SELECT
      *
    FROM
      matches
    WHERE
      mentee_user_id = ${Number(id)}
  `;
  return matches;
});

export const putMatchResponse = cache(
  async (
    id: number,
    responseFromMentor: string,
    statusInternal: string,
    requestExpiry: null,
  ) => {
    const [match] = await sql<Match[]>`
      UPDATE matches
      SET
        response_from_mentor = ${responseFromMentor},
        status_internal = ${statusInternal},
        request_expiry = ${requestExpiry}
      WHERE
        id = ${id} RETURNING *
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



 */
