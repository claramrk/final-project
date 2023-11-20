import { Sql } from 'postgres';

const roleslist = [
  {
    name: 'incomplete mentor',
    type: 'mentor',
  },
  {
    name: 'complete mentor',
    type: 'mentor',
  },
  {
    name: 'approved mentor',
    type: 'mentor',
  },
  {
    name: 'incomplete mentee',
    type: 'mentee',
  },
  {
    name: 'complete mentee',
    type: 'mentee',
  },
  {
    name: 'approved mentee',
    type: 'mentee',
  },
  {
    name: 'teammember',
    type: 'teammember',
  },
  {
    name: 'admin',
    type: 'admin',
  },
];

export async function up(sql: Sql) {
  for (const role of roleslist) {
    await sql`
      INSERT INTO
        roles (
          name,
          type
        )
      VALUES
        (
          ${role.name},
          ${role.type}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const role of roleslist) {
    await sql`
      DELETE FROM roles
      WHERE
        name = ${role.name}
    `;
  }
}
