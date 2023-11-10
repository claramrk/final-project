import {
  getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject,
  getUserWithMenteeUniversityApplicationsbyEmailWithUniAndSubject,
} from '../database/users';

export default async function getTopThreeMentors(email: string) {
  // create joined list of accepted mentors with their universities, subjects, degree level (joined from mentor_backgrounds), and origin, max_capcity (directly from users), and ?

  if (!email) {
    console.log('error - no email');
  }

  const userWithUniversityApplication =
    await getUserWithMenteeUniversityApplicationsbyEmailWithUniAndSubject(
      email,
    );

  const userUniversityApplication =
    userWithUniversityApplication?.userMenteeUniversityApplications;

  if (!userUniversityApplication) {
    console.log('error - university application');
  }

  if (!userUniversityApplication?.at(0)) {
    console.log('error - university application');
  }

  const userUniversityApplicationOnly = userUniversityApplication[0];

  const usersWithUniversityBackground =
    await getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject();

  // filter to those who have "confirmed mentor -> id=3" or "confirmed mentee -> id=6" - not specifically necessary but just to make sure

  const confirmedMentors = usersWithUniversityBackground.filter(
    (user) => user.usersRoleId === 3,
  );

  // filter to only those who have  null or undefined in "pause until"  - aka are active
  const confirmedMentorsNoPause = confirmedMentors.filter(
    (user) => !user.usersPauseUntil,
  );

  // filter mentors who have maxcapacity count of active or requested pairings - later!

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
    element.userMentorUniversityBackgrounds?.forEach((element) => {
      if (
        element.universityId ===
        userUniversityApplicationOnly?.firstUniversityId
      ) {
        matchingTest.menteeUniOneMatch = weights.universityMatchWeight;
      }
      if (
        element.universityId ===
        userUniversityApplicationOnly?.secondUniversityId
      ) {
        matchingTest.menteeUniTwoMatch = weights.universityMatchWeight;
      }
      if (
        element.universityId ===
        userUniversityApplicationOnly?.thirdUniversityId
      ) {
        matchingTest.menteeUniThreeMatch = weights.universityMatchWeight;
      }
      if (element.subjectId === userUniversityApplicationOnly?.firstSubjectId) {
        matchingTest.menteeSubjectOneMatch = weights.subjectMatchWeight;
      }
      if (
        element.subjectId === userUniversityApplicationOnly?.secondSubjectId
      ) {
        matchingTest.menteeSubjectTwoMatch = weights.subjectMatchWeight;
      }
      if (element.subjectId === userUniversityApplicationOnly?.thirdSubjectId) {
        matchingTest.menteeSubjectThreeMatch = weights.subjectMatchWeight;
      }
      // something isnt working correctly here yet!
      if (
        Number(element.studylevel) ===
        Number(userUniversityApplicationOnly?.studylevel)
      ) {
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
