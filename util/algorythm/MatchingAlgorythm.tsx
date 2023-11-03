import {
  getUsersWithMenteeUniversityApplicationsbyUserIDWithUniAndSubject,
  getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject,
} from '../../database/users';

export default async function MatchingAlgorythm() {
  const usersWithUniversityApplication =
    await getUsersWithMenteeUniversityApplicationsbyUserIDWithUniAndSubject();
  const usersWithUniversityBackground =
    await getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject();

  console.log(JSON.stringify(usersWithUniversityApplication));
  console.log(JSON.stringify(usersWithUniversityBackground));
}
