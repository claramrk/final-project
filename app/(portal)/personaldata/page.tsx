import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getUserBySessionToken } from '../../../database/users';
import PersonalDataFormComponent from './PersonalDataFormComponent';

export default async function personaldata() {
  const countries = await getCountries();
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/login?returnTo=/notes');

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Personal Data</h1>
      </div>
      <div id="usersSection" className="card blurry">
        <h2 className="h2-custom-primary">Personal Data Section</h2>
        <p className="p-custom-primary">Please enter your personal data here</p>
        <PersonalDataFormComponent
          countries={countries}
          userdata={currentUser}
        />
      </div>
    </main>
  );
}
