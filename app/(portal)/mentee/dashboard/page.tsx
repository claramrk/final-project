import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../../database/users';
import ButtonGoBack from '../../../components/ButtonGoBack';

export default async function dashboardMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect(`../signIn`);

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Dashboard</h1>
      </div>
      <div
        id="matchingInformationSection_visibleMENTORS"
        className="card blurry"
      >
        <div id="matchingHighlightsSection" className="card blurry">
          <h2 className="h2-custom-primary">My Matching Highlights</h2>

          <p className="p-custom-primary">
            Active Match #1: Menteephoto | Menteename | Match active since: DATE
          </p>
          <a className="link-custom-primary" href="/matchingoverview/mentors">
            Go to Matching Page
          </a>

          <Link className="link-custom-primary" href="/mentor/matchingoverview">
            Go to Matching Page
          </Link>
        </div>
        <div id="profileSection" className="card blurry">
          <h2 className="h2-custom-primary">My Profile Highlights</h2>
          <p className="p-custom-primary">
            User Photo | User Name | User Role | User activity status
          </p>
          <a className="link-custom-primary" href="/users">
            Go to Profile Page
          </a>
          <Link className="link-custom-primary" href="/mentee/matchingoverview">
            Go to Matching Page
          </Link>
        </div>
        <div id="communicationSection" className="card blurry">
          <h2 className="h2-custom-primary">More Information</h2>
          <p className="p-custom-primary">Info 1</p>
          <p className="p-custom-primary">Info 2</p>
          <p className="p-custom-primary">Info 3</p>
        </div>
      </div>
      <ButtonGoBack />
    </main>
  );
}
