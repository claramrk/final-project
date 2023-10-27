import { Sql } from 'postgres';

export type UserAll = {
  id: number;
  email: string;
  passwordHash: string;
  roleId: number | null;
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

export type UserAllNoPassword = {
  id: number;
  email: string;
  passwordHash: string;
  roleId: number | null;
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

export type UserIdEmailOnly = {
  id: number;
  email: string;
};

export type UserIdEmailPassword = {
  id: number;
  email: string;
  passwordHash: string;
};

export type UserIdEmailRole = {
  id: number;
  email: string;
  roleId: number | null;
};
// issue, why is this potentially null? but typescript didnt leave me alone in the create users fucntion otherwise

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    pronouns VARCHAR(255),
    phone_number integer ,
    birthdate TIMESTAMP,
    country_id varchar(10)  REFERENCES countries(id) ON UPDATE CASCADE,
    photo VARCHAR(255),
    role_id integer REFERENCES roles(id) ON UPDATE CASCADE,
    last_activity TIMESTAMP ,
    last_update TIMESTAMP,
    pause_until TIMESTAMP,
    max_capacity integer,
    contract_doc_url VARCHAR(255)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE users
`;
}
