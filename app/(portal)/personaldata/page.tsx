import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountries } from '../../../database/countries';
import { getRoleByName } from '../../../database/roles';
import { getUserBySessionToken } from '../../../database/users';
import MenteeHeaderComponent from '../../components/MenteeHeaderComponent';
import MentorHeaderComponent from '../../components/MentorHeaderComponent';
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
  if (!currentUserRole) redirect('/signIn?returnTo=/#');

  if (!currentUserRole.name) {
    return;
  }
  const currentUserRoleByName = await getRoleByName(currentUserRole.name);

  if (!currentUserRoleByName) {
    redirect(`../error`);
  }

  const menteeIncompleteRoleByName = await getRoleByName('incomplete mentee');
  const mentorIncompleteRoleByName = await getRoleByName('incomplete mentor');

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
      {currentUserRoleByName === menteeIncompleteRoleByName ? (
        <MenteeHeaderComponent
          step={[1]}
          titleBold="Welcome."
          titleNormal="Happy you want to become a"
          titleUnderlined={`${currentUserRoleByName.type}.`}
        />
      ) : (
        ''
      )}
      {currentUserRoleByName === mentorIncompleteRoleByName ? (
        <MentorHeaderComponent
          step={[1]}
          titleBold="Welcome."
          titleNormal="Happy you want to become a"
          titleUnderlined={`${currentUserRoleByName.type}.`}
        />
      ) : (
        ''
      )}

      <div>
        <PersonalDataFormComponent
          countries={countries}
          currentUser={currentUser}
          currentUserRole={newRole}
        />
      </div>
    </main>
  );
}
