import { Sql } from 'postgres';

export type Role = {
  id: number;
  name: string;
  type: string;
  permissions: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE roles (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    permissions VARCHAR(255) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE roles
`;
}
