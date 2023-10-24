import { Sql } from 'postgres';

export type User = {
  id: number;
  email: string;
  password_hash: string;
  firstname: string;
  lastname: string;
  pronouns: number;
  phone_number: number;
  birthdate: Date;
  country_id: string;
  photo: string;
  role_id: number;
  last_update: Date;
  pause_until: Date;
  max_capacity: number;
  contract_doc_url: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NULL,
    lastname VARCHAR(255) NULL,
    pronouns integer  NULL,
    phone_number integer  NULL,
    birthdate TIMESTAMP  NULL,
    country_id varchar(10)  REFERENCES countries(id) ON UPDATE CASCADE,
    photo VARCHAR(255) NULL,
    role_id integer  NULL REFERENCES roles(id) ON UPDATE CASCADE,
    last_activity TIMESTAMP  NULL,
    last_update TIMESTAMP NULL,
    pause_until TIMESTAMP NOT NULL,
    max_capacity integer NULL,
    contract_doc_url VARCHAR(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE users
`;
}
