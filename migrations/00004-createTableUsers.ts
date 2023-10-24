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
    email varchar(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    pronouns integer NOT NULL,
    phone_number integer NOT NULL,
    birthdate TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    country_id varchar(10) NOT NULL REFERENCES countries(id) ON UPDATE CASCADE,
    photo VARCHAR(255) NULL,
    role_id integer NOT NULL REFERENCES roles(id) ON UPDATE CASCADE,
    last_activity TIMESTAMP(0) NOT NULL,
    last_update TIMESTAMP(0) NOT NULL,
    pause_until TIMESTAMP(0) NOT NULL,
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
