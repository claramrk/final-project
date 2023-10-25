import { Sql } from 'postgres';

export type User = {
  id: number;
  email: string;
  roleId: number;
  passwordHash: string;
  firstname: string | undefined;
  lastname: string | undefined;
  pronouns: string | undefined;
  phoneNumber: number | undefined;
  birthdate: Date | undefined;
  countryId: string | undefined;
  photo: string | undefined;
  lastUpdate: Date | undefined;
  pauseUntil: Date | undefined;
  maxCapacity: number | undefined;
  contractDocUrl: string | undefined;
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

export type UserPersonalInfo = {
  id: number;
  firstName: string;
  lastName: string;
  pronouns: string;
  phoneNumber: number;
  birthdate: Date;
  countryId: string;
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
    birthdate date ,
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
