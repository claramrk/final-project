import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';

type Props = {
  children: React.ReactNode;
};

export default async function usersLayout(props: Props) {
  const headersList = headers();

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // User has to be an admin
  // Get user from the database that meets the admin requirements

  // 3. Either redirect or render the login form
  if (!session) redirect(`../signIn`);

  return <div>{props.children}</div>;
}
