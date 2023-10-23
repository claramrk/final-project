import { Sql } from 'postgres';

const universitylist = [
  {
    name: 'University of Edinburgh',
    country: 'United Kingdom',
  },
  {
    name: 'Trinity College Dublin',
    country: 'Ireland',
  },
  {
    name: 'University of Oxford',
    country: 'United Kingdom',
  },
  {
    name: 'Harvard University',
    country: 'United States',
  },
  {
    name: 'Sciences Po',
    country: 'France',
  },
  {
    name: 'Brown University',
    country: 'United States',
  },
  {
    name: 'Columbia University',
    country: 'United States',
  },
  {
    name: 'Cornell University',
    country: 'United States',
  },
  {
    name: 'Dartmouth College',
    country: 'United States',
  },
  {
    name: 'ETH Zurich',
    country: 'Switzerland',
  },
  {
    name: 'Imperial College London',
    country: 'United Kingdom',
  },
  {
    name: 'Johns Hopkins University',
    country: 'United States',
  },
  {
    name: 'Princeton University',
    country: 'United States',
  },
  {
    name: 'Stanford University',
    country: 'United States',
  },
  {
    name: 'University College London (UCL)',
    country: 'United Kingdom',
  },
  {
    name: 'University of California, Berkeley',
    country: 'United States',
  },
  {
    name: 'University of Cambridge',
    country: 'United Kingdom',
  },
  {
    name: 'University of St. Andrews',
    country: 'United Kingdom',
  },
  {
    name: 'University of Warwick',
    country: 'United Kingdom',
  },
  {
    name: 'Yale University',
    country: 'United States',
  },
  {
    name: 'Bocconi University',
    country: 'Italy',
  },
  {
    name: 'University of Durham',
    country: 'United Kingdom',
  },
  {
    name: 'California Institute of Technology (Caltech)',
    country: 'United States',
  },
  {
    name: 'Copenhagen Business School (CBS)',
    country: 'Denmark',
  },
  {
    name: 'Hong Kong University (HKU)',
    country: 'China',
  },
  {
    name: 'King’s College London (KCL)',
    country: 'United Kingdom',
  },
  {
    name: 'London School of Economics and Political Science (LSE)',
    country: 'United Kingdom',
  },
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    country: 'United States',
  },
  {
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
  },
  {
    name: 'New York University (NYU)',
    country: 'United States',
  },
  {
    name: 'University of Amsterdam (UvA)',
    country: 'Netherlands',
  },
  {
    name: 'University of California, Los Angeles (UCLA)',
    country: 'United States',
  },
  {
    name: 'University of Pennsylvania (UPenn)',
    country: 'United States',
  },
];

// find out how to do insert into where?

export async function up(sql: Sql) {
  for (const university of universitylist) {
    await sql`
  INSERT INTO universities (
      name, country_id)
    VALUES
    (${university.name}, ${university.country_id})
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
