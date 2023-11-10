import { Sql } from 'postgres';

const mockMentorslist = [
  {
    email: 'john.doe@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'John',
    lastname: 'Doe',
    pronouns: 'he/him/his',
    phone_number: 1234567890,
    birthdate: new Date('1990-01-15 00:00:00'),
    country_id: 'USA',
    max_capacity: 5,
    role_id: 3,
  },
  {
    email: 'alice.smith@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'Alice',
    lastname: 'Smith',
    pronouns: 'she/her/hers',
    phone_number: 9876543210,
    birthdate: new Date('1985-04-20 00:00:00'),
    country_id: 'CAN',
    max_capacity: 8,
    role_id: 3,
  },
  {
    email: 'megan.johnson@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'Megan',
    lastname: 'Johnson',
    pronouns: 'they/them/theirs',
    phone_number: 5551234567,
    birthdate: new Date('1998-07-10 00:00:00'),
    country_id: 'GBR',
    max_capacity: 6,
    role_id: 3,
  },
  {
    email: 'david.brown@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'David',
    lastname: 'Brown',
    pronouns: 'he/him/his',
    phone_number: 1112223333,
    birthdate: new Date('1992-12-05 00:00:00'),
    country_id: 'AUS',
    max_capacity: 7,
    role_id: 3,
  },
  {
    email: 'linda.wilson@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'Linda',
    lastname: 'Wilson',
    pronouns: 'she/her/hers',
    phone_number: 9990001111,
    birthdate: new Date('1989-09-12 00:00:00'),
    country_id: 'FRA',
    max_capacity: 5,
    role_id: 3,
  },
  {
    email: 'william.jones@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'William',
    lastname: 'Jones',
    pronouns: 'he/him/his',
    phone_number: 1234567890,
    birthdate: new Date('1985-04-20 00:00:00'),
    country_id: 'CAN',
    max_capacity: 8,
    role_id: 3,
  },
  {
    email: 'emily.davis@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'Emily',
    lastname: 'Davis',
    pronouns: 'she/her/hers',
    phone_number: 9876543210,
    birthdate: new Date('1998-07-10 00:00:00'),
    country_id: 'GBR',
    max_capacity: 6,
    role_id: 3,
  },
  {
    email: 'james.wilson@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'James',
    lastname: 'Wilson',
    pronouns: 'he/him/his',
    phone_number: 1112223333,
    birthdate: new Date('1992-12-05 00:00:00'),
    country_id: 'AUS',
    max_capacity: 7,
    role_id: 3,
  },
  {
    email: 'sarah.miller@example.com',
    password_hash:
      '$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62',
    firstname: 'Sarah',
    lastname: 'Miller',
    pronouns: 'she/her/hers',
    phone_number: 9990001111,
    birthdate: new Date('1989-09-12 00:00:00'),
    country_id: 'FRA',
    max_capacity: 5,
    role_id: 3,
  },
];

export async function up(sql: Sql) {
  for (const user of mockMentorslist) {
    await sql`
  INSERT INTO users (
    email, password_hash, firstname, lastname, pronouns, phone_number, birthdate, country_id,  max_capacity, role_id)
    VALUES
    (${user.email}, ${user.password_hash}, ${user.firstname}, ${user.lastname}, ${user.pronouns}, ${user.phone_number}, ${user.birthdate}, ${user.country_id}, ${user.max_capacity}, ${user.role_id})
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of mockMentorslist) {
    await sql`
      DELETE FROM users WHERE email = ${user.email}
`;
  }
}
