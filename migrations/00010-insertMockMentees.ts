import { Sql } from 'postgres';

const mockMenteeslist = [
  {
    email: 'jane.smith@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Jane',
    lastname: 'Smith',
    pronouns: 'she/her/hers',
    phone_number: 1112233444,
    birthdate: new Date('1995-08-10 00:00:00'),
    country_id: 'DEU',
    role_id: 6,
  },
  {
    email: 'robert.johnson@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Robert',
    lastname: 'Johnson',
    pronouns: 'he/him/his',
    phone_number: 5556781234,
    birthdate: new Date('1990-05-17 00:00:00'),
    country_id: 'GBR',
    role_id: 6,
  },
  {
    email: 'susan.williams@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Susan',
    lastname: 'Williams',
    pronouns: 'she/her/hers',
    phone_number: 9876654321,
    birthdate: new Date('1987-12-30 00:00:00'),
    country_id: 'FRA',
    role_id: 6,
  },
  {
    email: 'michael.davis@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Michael',
    lastname: 'Davis',
    pronouns: 'he/him/his',
    phone_number: 3332221111,
    birthdate: new Date('1982-09-25 00:00:00'),
    country_id: 'ESP',
    role_id: 6,
  },
  {
    email: 'laura.martin@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Laura',
    lastname: 'Martin',
    pronouns: 'she/her/hers',
    phone_number: 5558887777,
    birthdate: new Date('1993-03-08 00:00:00'),
    country_id: 'ITA',
    role_id: 6,
  },
  {
    email: 'steven.jones@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Steven',
    lastname: 'Jones',
    pronouns: 'he/him/his',
    phone_number: 4445556666,
    birthdate: new Date('1998-01-12 00:00:00'),
    country_id: 'CAN',
    role_id: 6,
  },
  {
    email: 'emily.anderson@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Emily',
    lastname: 'Anderson',
    pronouns: 'she/her/hers',
    phone_number: 7773339999,
    birthdate: new Date('1991-11-02 00:00:00'),
    country_id: 'USA',
    role_id: 6,
  },
  {
    email: 'thomas.miller@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Thomas',
    lastname: 'Miller',
    pronouns: 'he/him/his',
    phone_number: 8889994444,
    birthdate: new Date('1986-06-22 00:00:00'),
    country_id: 'AUS',
    role_id: 6,
  },
  {
    email: 'mary.harris@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Mary',
    lastname: 'Harris',
    pronouns: 'she/her/hers',
    phone_number: 1119998888,
    birthdate: new Date('1984-04-14 00:00:00'),
    country_id: 'DEU',
    role_id: 6,
  },
  {
    email: 'joseph.wilson@example.com',
    password_hash:
      '$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS',
    firstname: 'Joseph',
    lastname: 'Wilson',
    pronouns: 'he/him/his',
    phone_number: 9998887777,
    birthdate: new Date('1999-05-29 00:00:00'),
    country_id: 'FRA',
    role_id: 6,
  },
];

export async function up(sql: Sql) {
  for (const user of mockMenteeslist) {
    await sql`
  INSERT INTO users (
    email, password_hash, firstname, lastname, pronouns, phone_number, birthdate, country_id, role_id)
    VALUES
    (${user.email}, ${user.password_hash}, ${user.firstname}, ${user.lastname}, ${user.pronouns}, ${user.phone_number}, ${user.birthdate}, ${user.country_id}, ${user.role_id})
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of mockMenteeslist) {
    await sql`
      DELETE FROM users WHERE email = ${user.email}
`;
  }
}
