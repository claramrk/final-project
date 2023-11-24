import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../../database/users';
import MentorHeaderComponent from '../../../components/MentorHeaderComponent';
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
      <MentorHeaderComponent
        step={[1, 2, 3, 4]}
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
