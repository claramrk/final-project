import { Sql } from 'postgres';

const roleslist = [
  {
    name: 'incomplete mentor',
    type: 'mentor',
    permissions: '',
  },
  {
    name: 'complete mentor',
    type: 'mentor',
    permissions: '',
  },
  {
    name: 'approved mentor',
    type: 'mentor',
    permissions: '',
  },
  {
    name: 'incomplete mentee',
    type: 'mentee',
    permissions: '',
  },
  {
    name: 'complete mentee',
    type: 'mentee',
    permissions: '',
  },
  {
    name: 'approved mentee',
    type: 'mentee',
    permissions: '',
  },
  {
    name: 'teammember',
    type: 'teammember',
    permissions: '',
  },
  {
    name: 'admin',
    type: 'admin',
    permissions: '',
  },
];

export async function up(sql: Sql) {
  for (const role of roleslist) {
    await sql`
  INSERT INTO roles (
    name, type, permissions)
    VALUES
    (${role.name}, ${role.type}, ${role.permissions})
  `;
  }
}

export async function down(sql: Sql) {
  for (const role of roleslist) {
    await sql`
      DELETE FROM roles WHERE name = ${role.name}
`;
  }
}
