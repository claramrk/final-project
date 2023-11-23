import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import Navigation from '../components/Navigation';

type Props = {
  children: React.ReactNode;
};

export default async function portalLayout(props: Props) {
  // const headersList = headers();

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) redirect(`../signIn`);

  return (
    <div className="h-full">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navigation />
      </header>
      <div className=" isolate px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-32 sm:py-24 lg:py-28">
          <div className="container">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
