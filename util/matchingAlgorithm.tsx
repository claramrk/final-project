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

  // filter to those who have "confirmed mentor -> id=3" or "confirmed mentee -> id=6" - not specifically necessary but just to make sure

  const confirmedMentors = usersWithUniversityBackground.filter(
    (user) => user.usersRoleId === 3,
  );

  /*   const matches = await getAllMatches(); */

  // filter to only those who have  null or undefined in "pause until"  - aka are active
  /* const confirmedMentorsNoPause = confirmedMentors.filter(
    (user) => !user.usersPauseUntil,
  );
 */
  // filter mentors who have maxcapacity count of active or requested pairings - later!

  /*   const confirmedMentorsWithCapacity = confirmedMentors.filter(
    (user) => Number(getMatchesCountByID(user.usersId)) < user.usersMaxCapacity,
  ); */

  // filter mentors to those that do not contain the mentees user id in their "rejected" or "past mentors" column - later

  // check matches of mentor background anad mentee input and assign true and false

  const topThreeMentors = matching(
    confirmedMentors,
    userWithUniversityApplication,
    userUniversityApplicationOnly,
  );

  console.log('const confirmedMentors=');
  console.log(confirmedMentors);
  console.log('const userWithUniversityApplication=');
  console.log(userWithUniversityApplication);
  console.log('const userUniversityApplicationOnly=');
  console.log(userUniversityApplicationOnly);
  console.log('const topThreeMentors=');
  console.log(topThreeMentors);

  return topThreeMentors;
}
