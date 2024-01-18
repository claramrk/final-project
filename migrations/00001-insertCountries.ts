import { Sql } from 'postgres';

const countrylist = [
  { name: 'Afghanistan', abbreviation: 'AFG' },
  { name: 'Albania', abbreviation: 'ALB' },
  { name: 'Algeria', abbreviation: 'DZA' },
  { name: 'Andorra', abbreviation: 'AND' },
  { name: 'Angola', abbreviation: 'AGO' },
  { name: 'Antigua and Barbuda', abbreviation: 'ATG' },
  { name: 'Argentina', abbreviation: 'ARG' },
  { name: 'Armenia', abbreviation: 'ARM' },
  { name: 'Australia', abbreviation: 'AUS' },
  { name: 'Austria', abbreviation: 'AUT' },
  { name: 'Azerbaijan', abbreviation: 'AZE' },
  { name: 'Bahrain', abbreviation: 'BHR' },
  { name: 'Bangladesh', abbreviation: 'BGD' },
  { name: 'Barbados', abbreviation: 'BRB' },
  { name: 'Belarus', abbreviation: 'BLR' },
  { name: 'Belgium', abbreviation: 'BEL' },
  { name: 'Belize', abbreviation: 'BLZ' },
  { name: 'Benin', abbreviation: 'BEN' },
  { name: 'Bhutan', abbreviation: 'BTN' },
  { name: 'Bolivia', abbreviation: 'BOL' },
  { name: 'Bosnia and Herzegovina', abbreviation: 'BIH' },
  { name: 'Botswana', abbreviation: 'BWA' },
  { name: 'Brazil', abbreviation: 'BRA' },
  { name: 'Brunei', abbreviation: 'BRN' },
  { name: 'Bulgaria', abbreviation: 'BGR' },
  { name: 'Burkina Faso', abbreviation: 'BFA' },
  { name: 'Burundi', abbreviation: 'BDI' },
  { name: 'Cabo Verde', abbreviation: 'CPV' },
  { name: 'Cambodia', abbreviation: 'KHM' },
  { name: 'Cameroon', abbreviation: 'CMR' },
  { name: 'Canada', abbreviation: 'CAN' },
  { name: 'Central African Republic', abbreviation: 'CAF' },
  { name: 'Chad', abbreviation: 'TCD' },
  { name: 'Chile', abbreviation: 'CHL' },
  { name: 'China', abbreviation: 'CHN' },
  { name: 'Colombia', abbreviation: 'COL' },
  { name: 'Comoros', abbreviation: 'COM' },
  { name: 'Democratic Republic of Congo', abbreviation: 'COD' },
  { name: 'Republic of the Congo', abbreviation: 'COG' },
  { name: 'Costa Rica', abbreviation: 'CRI' },
  { name: 'Côte d’Ivoire', abbreviation: 'CIV' },
  { name: 'Croatia', abbreviation: 'HRV' },
  { name: 'Cuba', abbreviation: 'CUB' },
  { name: 'Cyprus', abbreviation: 'CYP' },
  { name: 'Czech Republic', abbreviation: 'CZE' },
  { name: 'Denmark', abbreviation: 'DNK' },
  { name: 'Djibouti', abbreviation: 'DJI' },
  { name: 'Dominica', abbreviation: 'DMA' },
  { name: 'Dominican Republic', abbreviation: 'DOM' },
  { name: 'East Timor (Timor-Leste)', abbreviation: 'TLS' },
  { name: 'Ecuador', abbreviation: 'ECU' },
  { name: 'Egypt', abbreviation: 'EGY' },
  { name: 'El Salvador', abbreviation: 'SLV' },
  { name: 'Equatorial Guinea', abbreviation: 'GNQ' },
  { name: 'Eritrea', abbreviation: 'ERI' },
  { name: 'Estonia', abbreviation: 'EST' },
  { name: 'Eswatini', abbreviation: 'SWZ' },
  { name: 'Ethiopia', abbreviation: 'ETH' },
  { name: 'Fiji', abbreviation: 'FJI' },
  { name: 'Finland', abbreviation: 'FIN' },
  { name: 'France', abbreviation: 'FRA' },
  { name: 'Gabon', abbreviation: 'GAB' },
  { name: 'Georgia', abbreviation: 'GEO' },
  { name: 'Germany', abbreviation: 'DEU' },
  { name: 'Ghana', abbreviation: 'GHA' },
  { name: 'Greece', abbreviation: 'GRC' },
  { name: 'Grenada', abbreviation: 'GRD' },
  { name: 'Guatemala', abbreviation: 'GTM' },
  { name: 'Guinea', abbreviation: 'GIN' },
  { name: 'Guinea-Bissau', abbreviation: 'GNB' },
  { name: 'Guyana', abbreviation: 'GUY' },
  { name: 'Haiti', abbreviation: 'HTI' },
  { name: 'Honduras', abbreviation: 'HND' },
  { name: 'Hungary', abbreviation: 'HUN' },
  { name: 'Iceland', abbreviation: 'ISL' },
  { name: 'India', abbreviation: 'IND' },
  { name: 'Indonesia', abbreviation: 'IDN' },
  { name: 'Iran', abbreviation: 'IRN' },
  { name: 'Iraq', abbreviation: 'IRQ' },
  { name: 'Ireland', abbreviation: 'IRL' },
  { name: 'Israel', abbreviation: 'ISR' },
  { name: 'Italy', abbreviation: 'ITA' },
  { name: 'Jamaica', abbreviation: 'JAM' },
  { name: 'Japan', abbreviation: 'JPN' },
  { name: 'Jordan', abbreviation: 'JOR' },
  { name: 'Kazakhstan', abbreviation: 'KAZ' },
  { name: 'Kenya', abbreviation: 'KEN' },
  { name: 'Kiribati', abbreviation: 'KIR' },
  { name: 'North Korea', abbreviation: 'PRK' },
  { name: 'South Korea', abbreviation: 'KOR' },
  { name: 'Kosovo', abbreviation: 'UNK' },
  { name: 'Kuwait', abbreviation: 'KWT' },
  { name: 'Kyrgyzstan', abbreviation: 'KGZ' },
  { name: 'Laos', abbreviation: 'LAO' },
  { name: 'Latvia', abbreviation: 'LVA' },
  { name: 'Lebanon', abbreviation: 'LBN' },
  { name: 'Lesotho', abbreviation: 'LSO' },
  { name: 'Liberia', abbreviation: 'LBR' },
  { name: 'Libya', abbreviation: 'LBY' },
  { name: 'Liechtenstein', abbreviation: 'LIE' },
  { name: 'Lithuania', abbreviation: 'LTU' },
  { name: 'Luxembourg', abbreviation: 'LUX' },
  { name: 'Madagascar', abbreviation: 'MDG' },
  { name: 'Malawi', abbreviation: 'MWI' },
  { name: 'Malaysia', abbreviation: 'MYS' },
  { name: 'Maldives', abbreviation: 'MDV' },
  { name: 'Mali', abbreviation: 'MLI' },
  { name: 'Malta', abbreviation: 'MLT' },
  { name: 'Marshall Islands', abbreviation: 'MHL' },
  { name: 'Mauritania', abbreviation: 'MRT' },
  { name: 'Mauritius', abbreviation: 'MUS' },
  { name: 'Mexico', abbreviation: 'MEX' },
  { name: 'Federated States of Micronesia', abbreviation: 'FSM' },
  { name: 'Moldova', abbreviation: 'MDA' },
  { name: 'Monaco', abbreviation: 'MCO' },
  { name: 'Mongolia', abbreviation: 'MNG' },
  { name: 'Montenegro', abbreviation: 'MNE' },
  { name: 'Morocco', abbreviation: 'MAR' },
  { name: 'Mozambique', abbreviation: 'MOZ' },
  { name: 'Myanmar (Burma)', abbreviation: 'MMR' },
  { name: 'Namibia', abbreviation: 'NAM' },
  { name: 'Nauru', abbreviation: 'NRU' },
  { name: 'Nepal', abbreviation: 'NPL' },
  { name: 'Netherlands', abbreviation: 'NLD' },
  { name: 'New Zealand', abbreviation: 'NZL' },
  { name: 'Nicaragua', abbreviation: 'NIC' },
  { name: 'Niger', abbreviation: 'NER' },
  { name: 'Nigeria', abbreviation: 'NGA' },
  { name: 'North Macedonia', abbreviation: 'MKD' },
  { name: 'Norway', abbreviation: 'NOR' },
  { name: 'Oman', abbreviation: 'OMN' },
  { name: 'Pakistan', abbreviation: 'PAK' },
  { name: 'Palau', abbreviation: 'PLW' },
  { name: 'Panama', abbreviation: 'PAN' },
  { name: 'Papua New Guinea', abbreviation: 'PNG' },
  { name: 'Paraguay', abbreviation: 'PRY' },
  { name: 'Peru', abbreviation: 'PER' },
  { name: 'Philippines', abbreviation: 'PHL' },
  { name: 'Poland', abbreviation: 'POL' },
  { name: 'Portugal', abbreviation: 'PRT' },
  { name: 'Qatar', abbreviation: 'QAT' },
  { name: 'Romania', abbreviation: 'ROU' },
  { name: 'Russia', abbreviation: 'RUS' },
  { name: 'Rwanda', abbreviation: 'RWA' },
  { name: 'Saint Kitts and Nevis', abbreviation: 'KNA' },
  { name: 'Saint Lucia', abbreviation: 'LCA' },
  { name: 'Saint Vincent and the Grenadines', abbreviation: 'VCT' },
  { name: 'Samoa', abbreviation: 'WSM' },
  { name: 'San Marino', abbreviation: 'SMR' },
  { name: 'Sao Tome and Principe', abbreviation: 'STP' },
  { name: 'Saudi Arabia', abbreviation: 'SAU' },
  { name: 'Senegal', abbreviation: 'SEN' },
  { name: 'Serbia', abbreviation: 'SRB' },
  { name: 'Seychelles', abbreviation: 'SYC' },
  { name: 'Sierra Leone', abbreviation: 'SLE' },
  { name: 'Singapore', abbreviation: 'SGP' },
  { name: 'Slovakia', abbreviation: 'SVK' },
  { name: 'Slovenia', abbreviation: 'SVN' },
  { name: 'Solomon Islands', abbreviation: 'SLB' },
  { name: 'Somalia', abbreviation: 'SOM' },
  { name: 'South Africa', abbreviation: 'ZAF' },
  { name: 'Spain', abbreviation: 'ESP' },
  { name: 'Sri Lanka', abbreviation: 'LKA' },
  { name: 'Sudan', abbreviation: 'SDN' },
  { name: 'South Sudan', abbreviation: 'SSD' },
  { name: 'Suriname', abbreviation: 'SUR' },
  { name: 'Sweden', abbreviation: 'SWE' },
  { name: 'Switzerland', abbreviation: 'CHE' },
  { name: 'Syria', abbreviation: 'SYR' },
  { name: 'Taiwan', abbreviation: 'TWN' },
  { name: 'Tajikistan', abbreviation: 'TJK' },
  { name: 'Tanzania', abbreviation: 'TZA' },
  { name: 'Thailand', abbreviation: 'THA' },
  { name: 'The Bahamas', abbreviation: 'BHS' },
  { name: 'The Gambia', abbreviation: 'GMB' },
  { name: 'Togo', abbreviation: 'TGO' },
  { name: 'Tonga', abbreviation: 'TON' },
  { name: 'Trinidad and Tobago', abbreviation: 'TTO' },
  { name: 'Tunisia', abbreviation: 'TUN' },
  { name: 'Turkey', abbreviation: 'TUR' },
  { name: 'Turkmenistan', abbreviation: 'TKM' },
  { name: 'Tuvalu', abbreviation: 'TUV' },
  { name: 'Uganda', abbreviation: 'UGA' },
  { name: 'Ukraine', abbreviation: 'UKR' },
  { name: 'United Arab Emirates', abbreviation: 'ARE' },
  { name: 'United Kingdom', abbreviation: 'GBR' },
  { name: 'United States', abbreviation: 'USA' },
  { name: 'Uruguay', abbreviation: 'URY' },
  { name: 'Uzbekistan', abbreviation: 'UZB' },
  { name: 'Vanuatu', abbreviation: 'VUT' },
  { name: 'Vatican City', abbreviation: 'VAT' },
  { name: 'Venezuela', abbreviation: 'VEN' },
  { name: 'Vietnam', abbreviation: 'VNM' },
  { name: 'Yemen', abbreviation: 'YEM' },
  { name: 'Zambia', abbreviation: 'ZMB' },
  { name: 'Zimbabwe', abbreviation: 'ZWE' },
];

export async function up(sql: Sql) {
  for (const country of countrylist) {
    await sql`
      INSERT INTO
        countries (id, name)
      VALUES
        (
          ${country.abbreviation},
          ${country.name}
        );
    `;
  }
}

export async function down(sql: Sql) {
  for (const country of countrylist) {
    await sql`
      DELETE FROM countries
      WHERE
        id = ${country.abbreviation}
    `;
  }
}
