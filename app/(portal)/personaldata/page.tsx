import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getUserBySessionToken } from '../../../database/users';
import PersonalDataFormComponent from './PersonalDataFormComponent';

export default async function personalData() {
  const countries = await getCountries();
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  return (
    <main>
      <div className="pageHeaderSection">
        <h1>My Personal Data</h1>
      </div>
      {user.email}
      <PersonalDataFormComponent countries={countries} />
    </main>
  );
}
