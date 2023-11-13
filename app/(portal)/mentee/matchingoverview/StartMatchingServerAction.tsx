import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW,
  getUserById,
  getUserBySessionToken,
} from '../../../../database/users';
import { UserAll } from '../../../../migrations/00008-createTableUsers';
import getTopThreeMentors from '../../../../util/matchingAlgorythm';

export async function StartMatchingAlgorithmServerAction(currentUser: UserAll) {
  // 1. Checking if the sessionToken cookie exists

  const topThreeMentorsList = await getTopThreeMentors(currentUser);

  const topThreeMentorsWithPersonalDataList = Promise.all(
    topThreeMentorsList.map((element) => {
      const user = getUserById(element.mentorUserId);
      return user;
    }),
  );

  return topThreeMentorsWithPersonalDataList;
}

export async function getMentorUserDataAction(id: number) {
  async function getMentorUserDataWithUniInfoObject(a: number) {
    const mentorUserDataWithUniInfoObject =
      await getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW(
        id,
      );

    if (!mentorUserDataWithUniInfoObject.at(0)) {
      console.log('error');
    }

    const mentorUserDataWithUniInfoObjectROW =
      mentorUserDataWithUniInfoObject[0].rowToJson;
    return mentorUserDataWithUniInfoObjectROW;
  }
  const topThreeMentorUserdataWithUniAndSubject =
    await getMentorUserDataWithUniInfoObject(id);

  return topThreeMentorUserdataWithUniAndSubject;
}
