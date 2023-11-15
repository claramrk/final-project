import { Sql } from 'postgres';
import { MentorUniversityBackground } from './00011-createTableMentorUniversityBackgrounds';

export type UserAll = {
  id: number;
  email: string;
  passwordHash: string;
  firstname: string | null;
  lastname: string | null;
  pronouns: string | null;
  phoneNumber: string | null;
  birthdate: Date | null;
  countryId: string | null;
  photo: string | null;
  roleId: number;
  lastActivity: Date | null;
  lastUpdate: Date | null;
  pauseUntil: Date | null;
  maxCapacity: number | null;
  contractDocUrl: string | null;
};

export type UserAllNoPassword = {
  id: number;
  email: string;
  roleId: number;
  firstname: string | null;
  lastname: string | null;
  pronouns: string | null;
  phoneNumber: number | null;
  birthdate: Date | null;
  countryId: string | null;
  photo: string | null;
  lastActivity: Date | null;
  lastUpdate: Date | null;
  pauseUntil: Date | null;
  maxCapacity: number | null;
  contractDocUrl: string | null;
};

type JsonAgg = MentorUniversityBackground[];

export type UserAllWithMatching = {
  id: number;
  email: string;
  passwordHash: string;
  firstname: string | null;
  lastname: string | null;
  pronouns: string | null;
  phoneNumber: string | null;
  birthdate: Date | null;
  countryId: string | null;
  photo: string | null;
  roleId: number;
  lastActivity: Date | null;
  lastUpdate: Date | null;
  pauseUntil: Date | null;
  maxCapacity: number | null;
  contractDocUrl: string | null;
  userMentorUniversityBackgrounds: JsonAgg | null;
};

export type UserIdEmailOnly = {
  id: number;
  email: string;
};

export type UserIdEmailPassword = {
  id: number;
  email: string;
  passwordHash: string;
  roleId: number;
};

export type UserIdEmailRole = {
  id: number;
  email: string;
  roleId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(100) NOT NULL,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        pronouns VARCHAR(255),
        phone_number BIGINT,
        birthdate TIMESTAMP,
        country_id VARCHAR(10) REFERENCES countries (id) ON DELETE CASCADE,
        photo VARCHAR(255),
        role_id INTEGER REFERENCES roles (id) ON DELETE CASCADE,
        last_activity TIMESTAMP,
        last_update TIMESTAMP,
        pause_until TIMESTAMP,
        max_capacity INTEGER,
        contract_doc_url VARCHAR(255)
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
