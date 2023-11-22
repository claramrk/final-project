import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';

export default async function menteeMatchingData() {
  /*  const subjects = await getSubjects();
  const universities = await getUniversities();
  const roleFromDatabase = await getRoleByName('approved mentee');
 */
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect(`../signIn`);

  return (
    <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
      <li className="step step-primary">Enter personal information</li>
      <li className="step step-accent">Enter target universities & subjects</li>
      <li className="step">Choose a mentor</li>
      <li className="step">Start your mentorship journey</li>
      <li className="step">Apply to uni!</li>
    </ul>
  );
}
