import { Sql } from 'postgres';

export const subjectlist = [
  {
    name: 'Architecture',
    discipline: 'Architecture & Design',
  },
  {
    name: 'Commercial Architecture',
    discipline: 'Architecture & Design',
  },
  {
    name: 'Environmental Design/Green Architecture',
    discipline: 'Architecture & Design',
  },
  {
    name: 'Industrial Architecture',
    discipline: 'Architecture & Design',
  },
  {
    name: 'Interior Design/Architecture',
    discipline: 'Architecture & Design',
  },
  {
    name: 'Residential Architecture',
    discipline: 'Architecture & Design',
  },
  {
    name: 'Urban Design/Planning',
    discipline: 'Architecture & Design',
  },
  {
    name: '(Comparative) Literature/English/Modern Languages',
    discipline: 'Arts & Humanities',
  },
  {
    name: '(Digital) Humanities',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Archaeology',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Classical Studies/Classics',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Cultural Studies/Medieval Studies',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Ethics',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'History',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Journalism',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Liberal Arts',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Linguistics',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Media Studies',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Music',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Philosophy',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Religion',
    discipline: 'Arts & Humanities',
  },
  {
    name: 'Theatre & Performance/Fine Arts/Film Studies',
    discipline: 'Arts & Humanities',
  },
  {
    name: '(Strategic) Entrepreneurship & Innovation',
    discipline: 'Business & Economics',
  },
  {
    name: 'Accounting',
    discipline: 'Business & Economics',
  },
  {
    name: 'Economics',
    discipline: 'Business & Economics',
  },
  {
    name: 'Finance/Banking/Financial Management',
    discipline: 'Business & Economics',
  },
  {
    name: 'Financial Policy & Regulation',
    discipline: 'Business & Economics',
  },
  {
    name: 'Human Resource Management & Organizational Analysis',
    discipline: 'Business & Economics',
  },
  {
    name: 'Management (incl. Business, ESG, Executive or International Management)',
    discipline: 'Business & Economics',
  },
  {
    name: 'Marketing (incl. Digital, Strategic, International Marketing)',
    discipline: 'Business & Economics',
  },
  {
    name: 'Dental Public Health',
    discipline: 'Dentistry, Oral & Craniofacial Science',
  },
  {
    name: 'Dental Therapy & Hygiene',
    discipline: 'Dentistry, Oral & Craniofacial Science',
  },
  {
    name: 'Dentistry (incl. Advanced Minimum Intervention Restorative, Aesthetic, Endodontics, Maxillofacial & Craniofacial Technology, Pediatric Dentistry, Periodontology, Regenerative Dentistry)',
    discipline: 'Dentistry, Oral & Craniofacial Science',
  },
  {
    name: 'Tissue Engineering & Innovation Technology',
    discipline: 'Dentistry, Oral & Craniofacial Science',
  },
  {
    name: 'Aerospace Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Biomedical Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Chemical Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Civil Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Electronic Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'General Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Industrial Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Mechanical Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Nuclear Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: 'Software Engineering',
    discipline: 'Engineering Sciences',
  },
  {
    name: '(International) Corporate/Financial/Commercial/Tax Law',
    discipline: 'Law',
  },
  {
    name: '(Transnational) Legal Studies',
    discipline: 'Law',
  },
  {
    name: 'Law (incl. American, English, French, German, Hong Kong, Australasian, European Union, Spanish Law, etc.)',
    discipline: 'Law',
  },
  {
    name: '(Clinical) Pharmacology/Pharmacy',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Anatomy, Development & Human Biology',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Biochemistry',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Biomedical Sciences',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Drug Development Science',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Forensic Science',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Healthcare Technologies/MedTech Innovation & Entrepreneurship',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Medical Affairs/Physiology',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Medicine',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Nutritional Science',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Physiotherapy',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Sport & Exercise Medical Sciences',
    discipline: 'Life Sciences & Medicine',
  },
  {
    name: 'Biology',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Chemistry (incl. with Biomedicine)',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Computational Finance',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Computer Science/(Advanced) Cybersecurity/Informatics',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Data Science',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Mathematics (incl. Financial Mathematics)',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Physics (incl. Theoretical Physics, Astrophysics and Cosmology, Biophysics)',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Robotics/Artificial Intelligence',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Statistics',
    discipline: 'Natural & Mathematical Sciences',
  },
  {
    name: 'Clinical Nursing',
    discipline: 'Nursing, Midwifery & Palliative Care',
  },
  {
    name: 'Midwifery',
    discipline: 'Nursing, Midwifery & Palliative Care',
  },
  {
    name: 'Nursing',
    discipline: 'Nursing, Midwifery & Palliative Care',
  },
  {
    name: 'Palliative Care',
    discipline: 'Nursing, Midwifery & Palliative Care',
  },
  {
    name: 'Addictions/(International) Addiction Studies',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Affective Disorders',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Applied Statistical Modelling & Health Informatics',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Clinical Neurodevelopmental Sciences',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Mental Health Studies (incl. Global Mental Health, Forensic Mental Health, Child & Adolescent Mental Health)',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Neuroscience',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Psychiatry (incl. Social Genetic & Developmental Psychiatry, Psychiatric Research, Organizational Psychiatry, Clinical Neuropsychiatry)',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: 'Psychology (incl. Clinical Psychology)',
    discipline: 'Psychiatry, Psychology & Neuroscience',
  },
  {
    name: '(International) Political Economy/Global Economy',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Cyber Policy & Strategy',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Education (incl. in Arts & Cultural Settings, Education Management, STEM Education, TESOL, Applied Linguistics and English Language Teaching)',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Environmental Science/Climate Change/Sustainability/Sustainable Cities/Urban Planning',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'European & International Studies/International Affairs/International Relations/Global Affairs/Global Studies',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Geography',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'International Development',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Politics (incl. European Politics)',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Politics, Philosophy and Economics (PPE)',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Public Policy/Public Administration',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Regional Studies (e.g., Asian Studies, Middle Eastern Studies, Slavic Studies, Chinese Studies, German Studies, American Studies, etc.)',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Social Sciences',
    discipline: 'Social Science & Public Policy',
  },
  {
    name: 'Terror Security & Society/War Studies/Risk Analysis, Disasters and Resilience/Intelligence & International Security/Conflict Studies/Peace Studies',
    discipline: 'Social Science & Public Policy',
  },
];

export async function up(sql: Sql) {
  for (const subject of subjectlist) {
    await sql`
      INSERT INTO
        subjects (
          name,
          discipline
        )
      VALUES
        (
          ${subject.name},
          ${subject.discipline}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const subject of subjectlist) {
    await sql`
      DELETE FROM subjects
      WHERE
        name = ${subject.name}
    `;
  }
}
