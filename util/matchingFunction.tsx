import { MenteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG } from '../database/menteeTargetUniversitySubject';
import { MenteeTargetUniversitySubject } from '../migrations/00013-createTableMenteeUniversityApplications';

export type JsonAgg = {
  id: number;
  userId: number;
  studylevel: number;
  attendanceType: number;
  universityId: number;
  subjectId: number;
};

export type ConfirmedMentors = {
  usersId: number;
  usersRoleId: number;
  usersCountryId: string | null;
  usersMaxCapacity: number | null;
  userMentorUniversityBackgrounds: JsonAgg[] | null;
};

export function matching(
  confirmedMentors: ConfirmedMentors[],
  userWithUniversityApplication: MenteeUniversityApplicationsbyUserIDWithUniAndSubjectJSONAGG,
  userUniversityApplicationOnly: MenteeTargetUniversitySubject,
) {
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

  confirmedMentors.forEach((element) => {
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
    matchingTest.menteeUserId = Number(userWithUniversityApplication.usersId);

    if (
      element.usersCountryId === userWithUniversityApplication.usersCountryId
    ) {
      matchingTest.originCountryMatch = weights.countryMatchWeight;
    }
    element.userMentorUniversityBackgrounds?.forEach((e: any) => {
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
