import { Sql } from 'postgres';

export type UserAll = {
  id: number;
  email: string;
  roleId: number;
  passwordHash: string;
  firstname: string | null;
  lastname: string | null;
  pronouns: string | null;
  phoneNumber: string | null;
  birthdate: Date | null;
  countryId: string | null;
  photo: string | null;
  maxCapacity: number | null;
};

export type UserAllNoPassword = {
  id: number;
  email: string;
  roleId: number;
  firstname: string | null;
  lastname: string | null;
  pronouns: string | null;
  phoneNumber: string | null;
  birthdate: Date | null;
  countryId: string | null;
  photo: string | null;
  maxCapacity: number | null;
};

export type UserIdEmailPassword = {
  id: number;
  email: string;
  roleId: number;
  passwordHash: string;
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
        role_id INTEGER NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
        max_capacity INTEGER
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
