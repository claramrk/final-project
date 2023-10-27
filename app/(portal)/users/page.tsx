import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getUserBySessionToken } from '../../../database/users';
import UsersFormComponent from './UserDataFormComponent';

export default async function Users() {
  const countries = await getCountries();
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/login?returnTo=/notes');

  return (
    <main>
      <div className="pageHeaderSection">
        <h1>My Personal Data</h1>
      </div>
      <UsersFormComponent countries={countries} userdata={currentUser} />
    </main>
  );
}
