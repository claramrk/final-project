import {
  getUsersWithMentorUniversityBackgroundbyUserIDWithUniAndSubject,
  getUserWithMenteeUniversityApplicationsbyEmailWithUniAndSubject,
} from '../database/users';

export type Props = {
  email: string;
};

export default async function MatchingAlgorythm(props: Props) {
  // create joined list of accepted mentors with their universities, subjects, degree level (joined from mentor_backgrounds), and origin, max_capcity (directly from users), and ?

  const userWithUniversityApplication =
    await getUserWithMenteeUniversityApplicationsbyEmailWithUniAndSubject(
      'jane.smith@example.com',
    );

  const userUniversityApplication =
    userWithUniversityApplication?.userMenteeUniversityApplications;

  if (!userUniversityApplication) {
    Error;
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

  // map  through menteor unilist

  const mentorTest = confirmedMentors.forEach((element) => {
    const matchingTest = {
      menteeUserId: 0,
      mentorUserId: 0,
      studylevelMatch: false,
      originCountryMatch: false,
      menteeUniOneMatch: false,
      menteeUniTwoMatch: false,
      menteeUniThreeMatch: false,
      menteeSubjectOneMatch: false,
      menteeSubjectTwoMatch: false,
      menteeSubjectThreeMatch: false,
    };
    const matchingArray = [
      {
        menteeUserId: 0,
        mentorUserId: 0,
        studylevelMatch: false,
        originCountryMatch: false,
        menteeUniOneMatch: false,
        menteeUniTwoMatch: false,
        menteeUniThreeMatch: false,
        menteeSubjectOneMatch: false,
        menteeSubjectTwoMatch: false,
        menteeSubjectThreeMatch: false,
      },
    ];
    matchingTest.mentorUserId = element.usersId;
    matchingTest.menteeUserId = Number(userWithUniversityApplication?.usersId);

    if (
      element.usersCountryId === userWithUniversityApplication?.usersCountryId
    ) {
      matchingTest.originCountryMatch = true;
    }
    element.userMentorUniversityBackgrounds?.forEach((element) => {
      if (
        element.universityId ===
        userUniversityApplicationOnly?.firstUniversityId
      ) {
        matchingTest.menteeUniOneMatch = true;
      }
      if (
        element.universityId ===
        userUniversityApplicationOnly?.secondUniversityId
      ) {
        matchingTest.menteeUniTwoMatch = true;
      }
      if (
        element.universityId ===
        userUniversityApplicationOnly?.thirdUniversityId
      ) {
        matchingTest.menteeUniThreeMatch = true;
      }
      if (element.subjectId === userUniversityApplicationOnly?.firstSubjectId) {
        matchingTest.menteeSubjectOneMatch = true;
      }
      if (
        element.subjectId === userUniversityApplicationOnly?.secondSubjectId
      ) {
        matchingTest.menteeSubjectTwoMatch = true;
      }
      if (element.subjectId === userUniversityApplicationOnly?.thirdSubjectId) {
        matchingTest.menteeSubjectThreeMatch = true;
      }
      if (
        Number(element.studylevel) ===
        Number(userUniversityApplicationOnly?.studylevel)
      ) {
        matchingTest.studylevelMatch = true;
      }
    });
    matchingArray.push(matchingTest);
    console.log(matchingTest);
  });
}
