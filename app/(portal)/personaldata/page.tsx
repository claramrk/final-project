import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getRoleByName } from '../../../database/roles';
import { getUserBySessionToken } from '../../../database/users';
import PersonalDataFormComponent from './PersonalDataFormComponent';

export default async function personaldata() {
  const countries = await getCountries();

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser || !currentUser.userRolesId) redirect('/signIn?returnTo=/#');

  const currentUserRole = currentUser.userRolesId[0];

  if (!currentUserRole.name) {
    console.log('error');
  }
  const currentUserRoleByName = await getRoleByName(currentUserRole.name);

  if (!currentUserRoleByName) {
    redirect(`../error`);
  }

  const menteeIncompleteRoleByName = await getRoleByName('incomplete mentee');

  const menteeCompleteRoleByName = await getRoleByName('complete mentee');
  const mentorCompleteRoleByName = await getRoleByName('complete mentor');

  const newRole =
    currentUserRoleByName === menteeIncompleteRoleByName
      ? menteeCompleteRoleByName
      : mentorCompleteRoleByName;

  if (!newRole) {
    redirect(`../error`);
  }

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">
          Welcome! We are so happy you want to become a{' '}
          {currentUserRoleByName.type}!
          {currentUserRoleByName === menteeIncompleteRoleByName ? (
            <ul className="steps">
              <li className="step step-accent">Enter personal information</li>
              <li className="step">Enter target universities & subjects</li>
              <li className="step">Choose your best mentor match</li>
              <li className="step">Wait for mentor acceptance</li>
              <li className="step">Start your mentorship journey</li>
              <li className="step">Apply to your dream uni!</li>
            </ul>
          ) : (
            ' '
          )}
        </h1>
      </div>
      <div id="usersSection">
        <PersonalDataFormComponent
          countries={countries}
          currentUser={currentUser}
          currentUserRole={newRole}
        />
      </div>
    </main>
  );
}
