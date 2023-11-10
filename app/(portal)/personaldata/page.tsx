import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getRoleByName } from '../../../database/roles';
import { getUserBySessionToken } from '../../../database/users';
import ButtonGoBack from '../../components/ButtonGoBack';
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
  console.log(currentUserRoleByName);
  const menteeIncompleteRoleByName = await getRoleByName('incomplete mentee');
  const mentorIncompleteRoleByName = await getRoleByName('incomplete mentor');

  const menteeCompleteRoleByName = await getRoleByName('complete mentee');
  const mentorCompleteRoleByName = await getRoleByName('complete mentor');

  const newRole =
    currentUserRoleByName === menteeIncompleteRoleByName
      ? menteeCompleteRoleByName
      : mentorCompleteRoleByName;

  if (!newRole) {
    console.log('error');
  }

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">
          Welcome! We are so happy you want to be a{' '}
          {currentUserRoleByName?.type}!
        </h1>
      </div>
      <div id="usersSection">
        <PersonalDataFormComponent
          countries={countries}
          currentUser={currentUser}
          role={newRole}
        />
      </div>
    </main>
  );
}
