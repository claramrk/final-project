import {
  getUsersWithMenteeUniversityApplicationsbyUserIDWithUniAndSubject,
  getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject,
} from '../../database/users';

export default async function MatchingAlgorythm() {
  const usersWithUniversityApplication =
    await getUsersWithMenteeUniversityApplicationsbyUserIDWithUniAndSubject();
  const usersWithUniversityBackground =
    await getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject();

  const mentors = usersWithUniversityBackground.filter(
    (user) => user.usersRoleId === 3,
  );
  const mentees = usersWithUniversityApplication.filter(
    (user) => user.usersRoleId === 6,
  );

  console.log(JSON.stringify(mentors));
  console.log(JSON.stringify(mentees));
}
