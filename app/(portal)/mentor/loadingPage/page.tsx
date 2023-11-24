import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../../database/users';
import MenteeHeaderComponent from '../../../components/MenteeHeaderComponent';
import LoadingComponentMentors from './LoadingComponentMentors';

export default async function loadingPageMentors() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  return (
    <main>
      <MenteeHeaderComponent
        step={[1, 2, 3]}
        titleBold="Adding"
        titleNormal="you to the"
        titleUnderlined="mentor pool."
      />
      <div className="card blurry">
        <h2 className="h2-custom-primary">Your Top Matches</h2>
        <LoadingComponentMentors />
      </div>
    </main>
  );
}
