/*
import getTopThreeMentors from '../../../../util/matchingAlgorythm';

type Props = {
  email: string;
};

export default async function MatchingAlgorythmButtonComponent(props: Props) {
  const userEmail = await props.email;

  if (userEmail) {
    async function startAlgorythm(email: string) {
      const topThreementors = await getTopThreeMentors(email);
      console.log(topThreementors);
      return topThreementors;
    }

    await startAlgorythm(userEmail);
  }

  return <button className="btn max-w-xs">Hi</button>;
}
*/
