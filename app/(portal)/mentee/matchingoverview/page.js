import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../../database/users';
import MenteeHeaderComponent from '../../../components/MenteeHeaderComponent';
import TopMentorsComponent from './TopMentorsComponent';

export default async function matchingOverviewMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  return (
    <main>
      <MenteeHeaderComponent
        step={[1, 2, 3, 4]}
        titleBold="Let's"
        titleNormal="find you a"
        titleUnderlined="mentor."
      />

      <TopMentorsComponent />
    </main>
  );
}
