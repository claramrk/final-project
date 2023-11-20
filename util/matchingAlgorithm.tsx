import { getRoleByName } from '../database/roles';
import {
  getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject,
  getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject,
} from '../database/users';
import { UserAll } from '../migrations/00008-createTableUsers';

export default async function getTopThreeMentors(currentUser: UserAll) {
  const menteeRole = await getRoleByName('approved mentee');

  if (!menteeRole) {
    console.log('error - no menteerole');
  }

  if (currentUser.roleId !== menteeRole?.id) {
    console.log('error - no user role overlap');
  }

  const userWithUniversityApplication =
    await getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject(
      currentUser.id,
    );

  if (!userWithUniversityApplication) {
    console.log('error - university application');
  }

  const userUniversityApplication =
    userWithUniversityApplication?.userMenteeUniversityApplications;

  if (!userUniversityApplication) {
    console.log('error - university application');
  }

  const userUniversityApplicationOnly = userUniversityApplication?.at(0)
    ? userUniversityApplication[0]
    : undefined;

  if (!userUniversityApplicationOnly) {
    console.log('error - no university application');
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

  const matchingArray = [
    {
      menteeUserId: 0,
      mentorUserId: 0,
      studylevelMatch: 0,
      originCountryMatch: 0,
      menteeUniOneMatch: 0,
      menteeUniTwoMatch: 0,
      menteeUniThreeMatch: 0,
      menteeSubjectOneMatch: 0,
      menteeSubjectTwoMatch: 0,
      menteeSubjectThreeMatch: 0,
      finalSum: 0,
    },
  ];

  const mentorTest = confirmedMentors.forEach((element) => {
    const matchingTest = {
      menteeUserId: 0,
      mentorUserId: 0,
      studylevelMatch: 0,
      originCountryMatch: 0,
      menteeUniOneMatch: 0,
      menteeUniTwoMatch: 0,
      menteeUniThreeMatch: 0,
      menteeSubjectOneMatch: 0,
      menteeSubjectTwoMatch: 0,
      menteeSubjectThreeMatch: 0,
      finalSum: 0,
    };

    // define and assign weights
    const weights = {
      universityMatchWeight: 30,
      countryMatchWeight: 15,
      studylevelMatchWeight: 10,
      subjectMatchWeight: 40,
    };

    matchingTest.mentorUserId = element.usersId;
    matchingTest.menteeUserId = Number(userWithUniversityApplication?.usersId);

    if (
      element.usersCountryId === userWithUniversityApplication?.usersCountryId
    ) {
      matchingTest.originCountryMatch = weights.countryMatchWeight;
    }
    element.userMentorUniversityBackgrounds?.forEach((e:any) => {
      if (e.universityId === userUniversityApplicationOnly.firstUniversityId) {
        matchingTest.menteeUniOneMatch = weights.universityMatchWeight;
      }
      if (e.universityId === userUniversityApplicationOnly.secondUniversityId) {
        matchingTest.menteeUniTwoMatch = weights.universityMatchWeight;
      }
      if (e.universityId === userUniversityApplicationOnly.thirdUniversityId) {
        matchingTest.menteeUniThreeMatch = weights.universityMatchWeight;
      }
      if (e.subjectId === userUniversityApplicationOnly.firstSubjectId) {
        matchingTest.menteeSubjectOneMatch = weights.subjectMatchWeight;
      }
      if (e.subjectId === userUniversityApplicationOnly.secondSubjectId) {
        matchingTest.menteeSubjectTwoMatch = weights.subjectMatchWeight;
      }
      if (e.subjectId === userUniversityApplicationOnly.thirdSubjectId) {
        matchingTest.menteeSubjectThreeMatch = weights.subjectMatchWeight;
      }
      if (e.studylevel === userUniversityApplicationOnly.studylevel) {
        matchingTest.studylevelMatch = weights.studylevelMatchWeight;
      }
    });
    matchingTest.finalSum =
      matchingTest.studylevelMatch +
      matchingTest.originCountryMatch +
      matchingTest.menteeUniOneMatch +
      matchingTest.menteeUniTwoMatch +
      matchingTest.menteeUniThreeMatch +
      matchingTest.menteeSubjectOneMatch +
      matchingTest.menteeSubjectTwoMatch +
      matchingTest.menteeSubjectThreeMatch;
    matchingArray.push(matchingTest);

    return matchingArray;
  });

  const sortedArray = matchingArray.sort(function (a, b) {
    return Number(a.finalSum) - Number(b.finalSum);
  });

  const topThreeMentors = sortedArray.slice(-3);

  return topThreeMentors;
}
