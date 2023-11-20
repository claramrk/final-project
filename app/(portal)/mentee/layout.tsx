import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

type Props = {
  children: React.ReactNode;
};

export default async function usersLayout(props: Props) {
  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // const headersList = headers();

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) redirect(`/not-found`);

  const currentUser = await getUserBySessionToken(sessionTokenCookie.value);
  if (!currentUser) redirect(`/not-found`);

  const currentUserRoleArray = currentUser.userRolesId;
  if (!currentUserRoleArray) redirect(`/not-found`);

  const currentUserRole = currentUserRoleArray[0];
  if (!currentUserRole) redirect(`/signIn`);

  if (currentUserRole.type !== 'mentee') redirect(`/not-found`);

  // User has to be an admin
  // Get user from the database that meets the admin requirements

  // 3. Either redirect or render the login form

  return <div>{props.children}</div>;
}
