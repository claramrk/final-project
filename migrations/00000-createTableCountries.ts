import { Sql } from 'postgres';

export type Country = {
  id: string;
  name: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      countries (
        id VARCHAR(100) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE countries `;
}
