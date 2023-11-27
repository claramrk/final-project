import { cache } from 'react';
import { Role } from '../migrations/00006-createTableRoles';
import {
  UserAll,
  UserAllNoPassword,
  UserIdEmailPassword,
  UserIdEmailRole,
} from '../migrations/00008-createTableUsers';
import { sql } from './connect';

export const createUser = cache(
  async (email: string, passwordHash: string, roleId: number) => {
    const [user] = await sql<UserIdEmailRole[]>`
      INSERT INTO
        users (
          email,
          password_hash,
          role_id
        )
      VALUES
        (
          ${email.toLowerCase()},
          ${passwordHash},
          ${roleId}
        ) RETURNING id,
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
      id,
      email,
      password_hash,
      role_id
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

type JsonAgg = Role[];

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
      maxCapacity: number | null;
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
      users.max_capacity,
      (
        SELECT
          json_agg (roles.*)
        FROM
          roles
        WHERE
          roles.id = users.role_id
      ) AS user_roles_id
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
      LEFT JOIN roles ON roles.id = users.role_id
  `;
  return user;
});

export const putUserRole = cache(async (userId: number, roleId: number) => {
  // return roles;
  const user = await sql<UserAll[]>`
    UPDATE users
    SET
      role_id = ${Number(roleId)}
    WHERE
      id = ${userId} RETURNING *
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
    const [personalDataInfoUsers] = await sql<UserAllNoPassword[]>`
      UPDATE users
      SET
        firstname = ${firstname},
        lastname = ${lastname},
        pronouns = ${pronouns},
        phone_number = ${phoneNumber},
        birthdate = ${birthdate},
        country_id = ${countryId},
        photo = ${photo}
      WHERE
        id = ${userId} RETURNING id,
        email,
        role_id,
        firstname,
        lastname,
        pronouns,
        phone_number,
        birthdate,
        country_id,
        photo,
        max_capacity
    `;
    return personalDataInfoUsers;
  },
);
/*
export type MentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG = {
  usersId: number;
  usersRoleId: number;
  usersCountryId: string | null;
  usersMaxCapacity: number | null;
  userMentorUniversityBackgrounds: JsonAgg | null;
};

export const getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject =
  cache(async () => {
    const mentorUniversityBackgroundbyUserIDWithUniAndSubject = await sql<
      MentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG[]
    >`
      SELECT
        users.id AS users_id,
        users.role_id AS users_role_id,
        users.country_id AS users_country_id,
        users.max_capacity AS users_max_capacity,
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
        INNER JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
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
      WITH
        subjects AS (
          SELECT
            subjects.*
          FROM
            subjects
          GROUP BY
            subjects.id
          ORDER BY
            subjects.id
        ),
        universities AS (
          SELECT
            universities.*
          FROM
            universities
          GROUP BY
            universities.id
          ORDER BY
            universities.id
        ),
        mentor_university_backgrounds AS (
          SELECT
            mentor_university_backgrounds.*,
            json_agg (
              universities
            ) AS universities,
            json_agg (
              subjects
            ) AS subjects
          FROM
            mentor_university_backgrounds
            LEFT JOIN universities ON universities.id = mentor_university_backgrounds.university_id
            LEFT JOIN subjects ON subjects.id = mentor_university_backgrounds.subject_id
          GROUP BY
            mentor_university_backgrounds.id
          ORDER BY
            mentor_university_backgrounds.id
        ),
        countries AS (
          SELECT
            countries.*
          FROM
            countries
        ),
        users AS (
          SELECT
            users.*,
            json_agg (
              mentor_university_backgrounds
            ) AS mentor_university_backgrounds,
            json_agg (
              countries
            ) AS countries
          FROM
            users
            LEFT JOIN countries ON countries.id = users.country_id
            LEFT JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
          WHERE
            users.id = ${id}
          GROUP BY
            users.id
          ORDER BY
            users.id
        )
      SELECT
        row_to_json (
          users
        )
      FROM
        users;
    `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  });
 */
/*


export const getAllUsers = cache(async () => {
  const users = await sql<UserAll[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
});

export const getUserWithMatchingInfoByIDInArray = cache(async () => {
  const usersMatchings = await sql<UserAllWithMatching[]>`
    SELECT
      *,
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
    GROUP BY
      users.id
  `;
  return usersMatchings;
});




export type MenteeUniversityApplicationsbyUserIDWithUniAndSubject = {
  usersId: number;
  roleId: number;
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
    MenteeUniversityApplicationsbyUserIDWithUniAndSubject[]
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
      INNER JOIN mentee_university_applications ON mentee_university_applications.user_id = users.id
      INNER JOIN countries ON countries.id = users.country_id
      INNER JOIN roles ON roles.id = users.role_id
  `;
  return menteeUniversityApplicationsbyUserIDWithUniAndSubject;
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
        INNER JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
        INNER JOIN countries ON countries.id = users.country_id
        INNER JOIN roles ON roles.id = users.role_id
        INNER JOIN universities ON universities.id = mentor_university_backgrounds.university_id
        INNER JOIN subjects ON subjects.id = mentor_university_backgrounds.subject_id
    `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  },
);


export type SingleUserWithMenteeUniversityApplicationbyUserIDJSONROW = {
  rowToJson: JsonAgg | null;
}[];

export const getSingleUserWithMenteeUniversityApplicationbyUserIDJSONROW =
  cache(async (id: number) => {
    const [singleUserWithMenteeUniversityApplicationbyUserIDJSONROW] =
      await sql<{ rowToJson: JsonAgg | null }[]>`
        WITH
          mentee_university_applications AS (
            SELECT
              mentee_university_applications.*
            FROM
              mentee_university_applications
            GROUP BY
              mentee_university_applications.id
            ORDER BY
              mentee_university_applications.id
          ),
          countries AS (
            SELECT
              countries.*
            FROM
              countries
          ),
          users AS (
            SELECT
              users.*,
              json_agg (
                mentee_university_applications
              ) AS mentee_university_applications,
              json_agg (
                countries
              ) AS countries
            FROM
              users
              LEFT JOIN countries ON countries.id = users.country_id
              LEFT JOIN mentee_university_applications ON mentee_university_applications.user_id = users.id
            WHERE
              users.id = ${id}
            GROUP BY
              users.id
            ORDER BY
              users.id
          )
        SELECT
          row_to_json (users)
        FROM
          users;
      `;
    return singleUserWithMenteeUniversityApplicationbyUserIDJSONROW;
  });





export type SingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONAGG =
  {
    usersId: number;
    usersFirstname: string | null;
    usersRoleId: number;
    usersCountryId: string | null;
    usersMaxCapacity: number | null;
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
        INNER JOIN mentor_university_backgrounds ON mentor_university_backgrounds.user_id = users.id
      WHERE
        users.id = ${id}
      GROUP BY
        users.id
    `;
    return mentorUniversityBackgroundbyUserIDWithUniAndSubject;
  });
 */
