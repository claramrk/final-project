'use client';

import { putMenteeBestMentorMatches } from '../../../../database/menteeTargetUniversitySubject';
import { UserAll } from '../../../../migrations/00008-createTableUsers';
import getTopThreeMentors from '../../../../util/matchingAlgorithm';

type Props = {
  currentUser: UserAll;
};

export default function StartMatchingAlgorithmButtonComponent(props: Props) {

 async function startAlgorithm() {
    const topThreeMentorsList = await getTopThreeMentors(props.currentUser);

    const topThreeMentorsArray = topThreeMentorsList.map((element) => {
      return element.mentorUserId;
    });
    //      const topThreeMentorsArrayAsString= JSON.stringify(topThreeMentorsArray);

    await putMenteeBestMentorMatches(
      props.currentUser.id,
      topThreeMentorsArray,
    );
  }

  return (
    <form onSubmit={() => startAlgorithm()}>
      <button className="btn-custom-primary">Hi</button>
    </form>
  );
}
