import { Sql } from 'postgres';

export type User = {
  id: number;
  email: string;
  firstname: string | undefined;
  lastname: string | undefined;
  pronouns: number | undefined;
  phone_number: number | undefined;
  birthdate: Date | undefined;
  country_id: string | undefined;
  photo: string | undefined;
  role_id: number;
  last_update: Date | undefined;
  pause_until: Date | undefined;
  max_capacity: number | undefined;
  contract_doc_url: string | undefined;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    pronouns integer ,
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
