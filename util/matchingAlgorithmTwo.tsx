import { getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject } from '../database/menteeTargetUniversitySubject';
import { getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject } from '../database/mentorUniversityBackgroundTwo';
import { getRoleByName } from '../database/roles';
import { UserAll } from '../migrations/00008-createTableUsers';
import { matching } from './matchingFunction';

export async function getTopThreeMentors(currentUser: UserAll) {
  const menteeRole = await getRoleByName('approved mentee');

  if (!menteeRole) {
    console.log('error - no menteerole');
    return [];
  }

  if (currentUser.roleId !== menteeRole.id) {
    console.log('error - no user role overlap');
    return [];
  }

  const userWithUniversityApplication =
    await getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject(
      currentUser.id,
    );

  if (!userWithUniversityApplication) {
    console.log('error - university application');
    return [];
  }

  const userUniversityApplication =
    userWithUniversityApplication.userMenteeUniversityApplications;

  if (!userUniversityApplication) {
    console.log('error - university application');
    return [];
  }

  const userUniversityApplicationOnly = userUniversityApplication.at(0)
    ? userUniversityApplication[0]
    : undefined;

  if (!userUniversityApplicationOnly) {
    console.log('error - no university application');
    return [];
  }
  const usersWithUniversityBackground =
    await getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject();

  const confirmedMentors = usersWithUniversityBackground.filter(
    (user) => user.usersRoleId === 3,
  );

  const topThreeMentors = matching(
    confirmedMentors,
    userWithUniversityApplication,
    userUniversityApplicationOnly,
  );

  return topThreeMentors;
}
