'use client';

import { putMenteeBestMentorMatches } from '../../../../database/menteeTargetUniversitySubject';
import { UserAll } from '../../../../migrations/00008-createTableUsers';
import getTopThreeMentors from '../../../../util/matchingAlgorithm';

type Props = {
  currentUser: UserAll;
  startAlgorithm: any;
};

export default function StartMatchingAlgorithmButtonComponent(props: Props) {
  /*   async function startAlgorithm() {
    'use server';
    const topThreeMentorsList = await getTopThreeMentors(props.currentUser);

    const topThreeMentorsArray = topThreeMentorsList.map((element) => {
      return element.mentorUserId;
    });
    //      const topThreeMentorsArrayAsString= JSON.stringify(topThreeMentorsArray);

    await putMenteeBestMentorMatches(
      props.currentUser.id,
      topThreeMentorsArray,
    );
  } */

  // doesnt work yet!

  /*   const topThreeMentorsList = await getTopThreeMentors(props.currentUser);

  const topThreeMentorsWithPersonalDataList = Promise.all(
    topThreeMentorsList.map((element) => {
      const user = getUserById(element.mentorUserId);
      return user;
    }),
  );

  async function getMentorUserDataWithUniInfoObject(id: number) {
    const mentorUserDataWithUniInfoObject =
      await getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW(
        id,
      );

    //  const mentorUserDataWithUniInfoObjectROW =
     //   mentorUserDataWithUniInfoObject[0].rowToJson;
     // return mentorUserDataWithUniInfoObjectROW;
    return mentorUserDataWithUniInfoObject;
  }

  async function getMentorUniBackgroundArray(
    mentorUserDataWithUniInfoObject: any,
  ) {
    const mentorUniBackgroundArray =
      await mentorUserDataWithUniInfoObject.mentorUniversityBackgrounds;

    function compareByStudylevel(a: any, b: any) {
      return a.studylevel - b.studylevel;
    }

    const uniBackgroundtoMap =
      await mentorUniBackgroundArray.sort(compareByStudylevel);
    return await uniBackgroundtoMap;
  } */
  return (
    <form onSubmit={() => props.startAlgorithm()}>
      <button className="btn-custom-primary">Hi</button>
    </form>
  );
}
