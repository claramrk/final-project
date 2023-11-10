import { cache } from 'react';
import {
  UserAll,
  UserAllWithMatching,
  UserIdEmailOnly,
  UserIdEmailPassword,
  UserIdEmailRole,
} from '../migrations/00008-createTableUsers';
import { sql } from './connect';

export const createUser = cache(
  async (email: string, passwordHash: string, roleId: number) => {
    const [user] = await sql<UserIdEmailRole[]>`
      INSERT INTO users
        (email, password_hash, role_id)
      VALUES
        (${email.toLowerCase()}, ${passwordHash}, ${roleId})
      RETURNING
        id,
        email,
        role_id
    `;
    return user;
  },
);

export const getUserByEmail = cache(async (email: string) => {
  const [user] = await sql<UserIdEmailRole[]>`
    SELECT
      id,
      email,
      role_id
          FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

export const getAllUsers = cache(async () => {
  const users = await sql<UserAll[]>`
    SELECT
      *
    FROM
      users

  `;
  return users;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<UserAll[]>`
    SELECT
     *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserWithPasswordHashByEmail = cache(async (email: string) => {
  const [user] = await sql<UserIdEmailPassword[]>`
    SELECT
      id, email, password_hash, role_id
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    {
      id: number;
      email: string;
      passwordHash: string;
      firstname: string | null;
      lastname: string | null;
      pronouns: string | null;
      phoneNumber: string | null;
      birthdate: Date | null;
      countryId: string | null;
      photo: string | null;
      roleId: number;
      lastActivity: Date | null;
      lastUpdate: Date | null;
      pauseUntil: Date | null;
      maxCapacity: number | null;
      contractDocUrl: string | null;
      userRolesId: JsonAgg | null;
    }[]
  >`
   SELECT
    users.id,
    users.email,
    users.password_hash,
    users.firstname,
    users.lastname,
    users.pronouns,
    users.phone_number,
    users.birthdate,
    users.country_id,
    users.photo,
    users.role_id,
    users.last_activity,
    users.last_update,
    users.pause_until,
    users.max_capacity,
    users.contract_doc_url,
    (
        SELECT
          json_agg (
            roles.*

          )
        FROM
          roles
        WHERE
        roles.id = users.role_id
      ) AS user_roles_id

    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
      LEFT JOIN roles ON roles.id = users.role_id

  `;
  return user;
});

export const putUserRole = cache(async (userId: number, roleId: number) => {
  // return roles;
  const user = await sql<UserAll[]>`
    UPDATE
    users
    SET
   role_id=${Number(roleId)}
    WHERE
    id = ${userId}
    RETURNING *
  `;
  return user;
});

export const putPersonalDataByUserID = cache(
  async (
    userId: number,
    firstname: string,
    lastname: string,
    pronouns: string,
    phoneNumber: number,
    birthdate: Date,
    countryId: string,
    photo: string,
  ) => {
    // return roles;
    const personalDataInfoUsers = await sql<UserAll[]>`
    UPDATE
    users
    SET
    firstname=${firstname},
    lastname=${lastname},
    pronouns=${pronouns},
    phone_number=${phoneNumber},
    birthdate=${birthdate},
    country_id=${countryId},
    photo=${photo}
    WHERE
    id = ${userId}
    RETURNING *
  `;
    return personalDataInfoUsers;
  },
);

export const getUserWithMatchingInfoByIDInArray = cache(async () => {
  const usersMatchings = await sql<UserAllWithMatching[]>`
      SELECT
*,      (
        SELECT
          json_agg (
            mentor_university_backgrounds.*

          )
        FROM
          mentor_university_backgrounds
        WHERE
        mentor_university_backgrounds.user_id = users.id
      ) AS user_mentor_university_backgrounds
    FROM
      users
      GROUP BY
      users.id

  `;
  return usersMatchings;
});

export type mentorUniversityBackgroundbyUserIDWithUniAndSubject = {
  usersId: number;
  usersMaxCapacity: number | null;
  usersOriginCountryId: string;
  rolesRoleName: string;
  uniBgId: number;
  uniBgUniversityId: number | null;
  uniBgSubjectId: number | null;
  uniBgStudylevelId: number;
  uniBgAttendanceType: number;
  uniBgSubjectDiscipline: string;
};

export const getMentorUniversityBackgroundWithUserInoUniAndSubject = cache(
  async () => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      mentorUniversityBackgroundbyUserIDWithUniAndSubject[]
    >`
      SELECT
users.id AS users_id,
users.max_capacity AS users_max_capacity,
countries.id AS users_origin_country_id,
roles.name AS roles_role_name,
mentor_university_backgrounds.id AS uni_bg_id,
mentor_university_backgrounds.university_id AS uni_bg_university_id,
mentor_university_backgrounds.subject_id AS uni_bg_subject_id,
mentor_university_backgrounds.studylevel AS uni_bg_studylevel_id,
mentor_university_backgrounds.attendance_type AS uni_bg_attendance_type,
subjects.discipline AS uni_bg_subject_discipline

FROM
users
 INNER JOIN mentor_university_backgrounds
ON mentor_university_backgrounds.user_id = users.id
INNER JOIN countries ON countries.id = users.country_id
INNER JOIN roles ON roles.id = users.role_id
INNER JOIN universities ON universities.id = mentor_university_backgrounds.university_id
INNER JOIN subjects ON subjects.id = mentor_university_backgrounds.subject_id

  `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  },
);

export type menteeUniversityApplicationsbyUserIDWithUniAndSubject = {
  usersId: number;
  roleId: number | null;
  usersOriginCountryId: string;
  rolesRoleName: string;
  uniAppStudylevelId: number;
  uniAppFirstUniversityId: number;
  uniAppFirstSubjectId: number;
  uniAppSecondUniversityId: number;
  uniAppSecondSubjectId: number;
  uniAppThirdUniversityId: number;
  uniAppThirdSubjectId: number;
};

export const getMenteeUniversityApplicationsWithUserInfo = cache(async () => {
  const menteeUniversityApplicationsbyUserIDWithUniAndSubject = await sql<
    menteeUniversityApplicationsbyUserIDWithUniAndSubject[]
  >`
      SELECT
users.id AS users_id,
users.role_id AS role_id,
countries.id AS users_origin_country_id,
roles.name AS roles_role_name,
mentee_university_applications.studylevel AS uni_app_studylevel_id,
mentee_university_applications.first_university_id AS uni_app_first_university_id,
mentee_university_applications.first_subject_id AS uni_app_first_subject_id,
mentee_university_applications.second_university_id AS uni_app_second_university_id,
mentee_university_applications.second_subject_id AS uni_app_second_subject_id,
mentee_university_applications.third_university_id AS uni_app_third_university_id,
mentee_university_applications.third_subject_id AS uni_app_third_subject_id

FROM
users
 INNER JOIN mentee_university_applications
ON mentee_university_applications.user_id = users.id
INNER JOIN countries ON countries.id = users.country_id
INNER JOIN roles ON roles.id = users.role_id





  `;
  return menteeUniversityApplicationsbyUserIDWithUniAndSubject;
});

export type mentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG = {
  usersId: number;
  usersRoleId: number;
  usersCountryId: string | null;
  usersMaxCapacity: number | null;
  usersPauseUntil: Date | null;
  userMentorUniversityBackgrounds: JsonAgg | null;
};

export const getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject =
  cache(async () => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      mentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG[]
    >`
      SELECT
users.id AS users_id,
users.role_id AS users_role_id,
users.country_id AS users_country_id,
users.max_capacity AS users_max_capacity,
users.pause_until AS users_pause_until,
(
  SELECT
    json_agg (
      mentor_university_backgrounds.*

    )
  FROM
    mentor_university_backgrounds
  WHERE
  mentor_university_backgrounds.user_id = users.id
) AS user_mentor_university_backgrounds
FROM
users
 INNER JOIN mentor_university_backgrounds
ON mentor_university_backgrounds.user_id = users.id
GROUP BY
users.id
  `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  });

export type menteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG = {
  usersId: number;
  usersRoleId: number;
  usersCountryId: string;
  usersPauseUntil: Date | null;
  userMenteeUniversityApplications: JsonAgg | null;
};

export const getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject =
  cache(async (id: number) => {
    const [menteeUniversityApplicationsbyUserIDWithUniAndSubject] = await sql<
      menteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG[]
    >`
      SELECT
users.id AS users_id,

users.role_id AS users_role_id,
users.country_id AS users_country_id,
users.pause_until AS users_pause_until,
(
  SELECT
    json_agg (
      mentee_university_applications.*
    )
  FROM
    mentee_university_applications
  WHERE
  mentee_university_applications.user_id = users.id
) AS user_mentee_university_applications
FROM
users
 INNER JOIN mentee_university_applications
ON mentee_university_applications.user_id = users.id
WHERE
users.id = ${id}

  `;
    return menteeUniversityApplicationsbyUserIDWithUniAndSubject;
  });

export type SingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG =
  {
    usersId: number;
    usersFirstname: string | null;
    usersRoleId: number;
    usersCountryId: string | null;
    usersMaxCapacity: number | null;
    usersPauseUntil: Date | null;
    userMentorUniversityBackgrounds: JsonAgg | null;
  };

export type JsonAgg = any[];

export const getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubject =
  cache(async (id: number) => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      SingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG[]
    >`
      SELECT
users.id AS users_id,
users.firstname AS users_firstname,
users.role_id AS users_role_id,
users.country_id AS users_country_id,
users.max_capacity AS users_max_capacity,
users.pause_until AS users_pause_until,
(
  SELECT
    json_agg (
      mentor_university_backgrounds.*

    )
  FROM
    mentor_university_backgrounds
  WHERE
  mentor_university_backgrounds.user_id = users.id
) AS user_mentor_university_backgrounds
FROM
users
 INNER JOIN mentor_university_backgrounds
ON mentor_university_backgrounds.user_id = users.id
WHERE
users.id=${id}
GROUP BY
users.id

  `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  });

export type SingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW =
  { rowToJson: JsonAgg | null }[];

export const getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW =
  cache(async (id: number) => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      { rowToJson: JsonAgg | null }[]
    >`
    WITH subjects as (
      SELECT
        subjects.*
      FROM subjects
      GROUP BY subjects.id
      order by subjects.id
  ),
    universities as (
      SELECT
        universities.*
      FROM universities
      GROUP BY universities.id
      order by universities.id
  ), mentor_university_backgrounds AS (
      SELECT
        mentor_university_backgrounds.*,
        json_agg(universities) as universities,
        json_agg(subjects) as subjects

      FROM mentor_university_backgrounds
      LEFT JOIN universities ON universities.id = mentor_university_backgrounds.university_id
      LEFT JOIN subjects ON subjects.id = mentor_university_backgrounds.subject_id

      GROUP BY mentor_university_backgrounds.id
      order by mentor_university_backgrounds.id
  ), countries as (
    SELECT
      countries.*
    FROM countries
), users AS (
      SELECT
        users.*,
        json_agg(mentor_university_backgrounds) as mentor_university_backgrounds,
        json_agg(countries) as countries

      FROM users
      LEFT JOIN countries ON countries.id = users.country_id
      LEFT JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
      WHERE users.id = ${id}
      group by users.id
      order by users.id

  )

  SELECT row_to_json(users)

  FROM users;

  `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  });

export type SingleUserWithMenteeUniversityApplicationbyUserIDJSONROW = {
  rowToJson: JsonAgg | null;
}[];

export const getSingleUserWithMenteeUniversityApplicationbyUserIDJSONROW =
  cache(async (id: number) => {
    const [singleUserWithMenteeUniversityApplicationbyUserIDJSONROW] =
      await sql<{ rowToJson: JsonAgg | null }[]>`
    WITH mentee_university_applications AS (
      SELECT
        mentee_university_applications.*

      FROM mentee_university_applications

      GROUP BY  mentee_university_applications.id
      order by  mentee_university_applications.id
  ), countries as (
    SELECT
      countries.*
    FROM countries
), users AS (
      SELECT
        users.*,
        json_agg(mentee_university_applications) as mentee_university_applications,
        json_agg(countries) as countries

      FROM users
      LEFT JOIN countries ON countries.id = users.country_id
      LEFT JOIN mentee_university_applications ON mentee_university_applications.user_id = users.id
      WHERE users.id =${id}
      group by users.id
      order by users.id

  )

  SELECT row_to_json(users)

  FROM users;

  `;
    return singleUserWithMenteeUniversityApplicationbyUserIDJSONROW;
  });
