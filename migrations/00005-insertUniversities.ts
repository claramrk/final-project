import { Sql } from 'postgres';

export const universitylist = [
  {
    name: 'University of Edinburgh',
    country: 'GBR',
    abbreviation: 'Edinburgh',
  },
  {
    name: 'Trinity College Dublin',
    country: 'IRL',
    abbreviation: 'Trinity',
  },
  {
    name: 'University of Oxford',
    country: 'GBR',
    abbreviation: 'Oxford',
  },
  {
    name: 'Harvard University',
    country: 'USA',
    abbreviation: 'Harvard',
  },
  {
    name: 'Sciences Po',
    country: 'FRA',
    abbreviation: 'Sciences Po',
  },
  {
    name: 'Brown University',
    country: 'USA',
    abbreviation: 'Brown',
  },
  {
    name: 'Columbia University',
    country: 'USA',
    abbreviation: 'Columbia',
  },
  {
    name: 'Cornell University',
    country: 'USA',
    abbreviation: 'Cornell',
  },
  {
    name: 'Dartmouth College',
    country: 'USA',
    abbreviation: 'Dartmouth',
  },
  {
    name: 'ETH Zurich',
    country: 'CHE',
    abbreviation: 'ETH',
  },
  {
    name: 'Imperial College London',
    country: 'GBR',
    abbreviation: 'UCL',
  },
  {
    name: 'Johns Hopkins University',
    country: 'USA',
    abbreviation: 'JHU',
  },
  {
    name: 'Princeton University',
    country: 'USA',
    abbreviation: 'Princeton',
  },
  {
    name: 'Stanford University',
    country: 'USA',
    abbreviation: 'Stanford',
  },
  {
    name: 'University College London',
    country: 'GBR',
    abbreviation: 'UCL',
  },
  {
    name: 'University of California, Berkeley',
    country: 'USA',
    abbreviation: 'UC Berkeley',
  },
  {
    name: 'University of Cambridge',
    country: 'GBR',
    abbreviation: 'Cambridge',
  },
  {
    name: 'University of St. Andrews',
    country: 'GBR',
    abbreviation: 'St. Andrews',
  },
  {
    name: 'University of Warwick',
    country: 'GBR',
    abbreviation: 'Warwick',
  },
  {
    name: 'Yale University',
    country: 'USA',
    abbreviation: 'Yale',
  },
  {
    name: 'Bocconi University',
    country: 'ITA',
    abbreviation: 'Bocconi',
  },
  {
    name: 'University of Durham',
    country: 'GBR',
    abbreviation: 'Durham',
  },
  {
    name: 'California Institute of Technology',
    country: 'USA',
    abbreviation: 'CalTech',
  },
  {
    name: 'Copenhagen Business School',
    country: 'DNK',
    abbreviation: 'CBS',
  },
  {
    name: 'Hong Kong University',
    country: 'CHN',
    abbreviation: 'HKU',
  },
  {
    name: 'King’s College London',
    country: 'GBR',
    abbreviation: 'KCL',
  },
  {
    name: 'London School of Economics and Political Science',
    country: 'GBR',
    abbreviation: 'LSE',
  },
  {
    name: 'Massachusetts Institute of Technology',
    country: 'USA',
    abbreviation: 'MIT',
  },
  {
    name: 'National University of Singapore',
    country: 'SGP',
    abbreviation: 'NUS',
  },
  {
    name: 'New York University',
    country: 'USA',
    abbreviation: 'NYU',
  },
  {
    name: 'University of Amsterdam',
    country: 'NLD',
    abbreviation: 'UvA',
  },
  {
    name: 'University of California, Los Angeles',
    country: 'USA',
    abbreviation: 'UCLA',
  },
  {
    name: 'University of Pennsylvania',
    country: 'USA',
    abbreviation: 'UPenn',
  },
];

export async function up(sql: Sql) {
  for (const university of universitylist) {
    await sql`
  INSERT INTO universities (
    name, country_id, abbreviation)
    VALUES
    (${university.name}, ${university.country}, ${university.abbreviation})
  `;
  }
}

export async function down(sql: Sql) {
  for (const university of universitylist) {
    await sql`
      DELETE FROM universities WHERE name = ${university.name}
`;
  }
}
