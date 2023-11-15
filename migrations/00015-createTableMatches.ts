import { Sql } from 'postgres';

export type Match = {
  id: number;
  menteeUserId: number;
  mentorUserId: number;
  requestExpiry: Date | null;
  messageToMentor: string;
  responseFromMentor: string | null;
  statusInternal: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      matches (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        mentee_user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        mentor_user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        request_expiry TIMESTAMP,
        message_to_mentor VARCHAR(255) NOT NULL,
        response_from_mentor VARCHAR(255),
        status_internal VARCHAR(255) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE matches CASCADE `;
}
