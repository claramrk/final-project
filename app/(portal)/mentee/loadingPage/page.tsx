import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../../database/users';
import LoaderComponent from './LoaderComponent';

export default async function matchingOverviewMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  return (
    <main>
      <div className="card blurry">
        <h1 className="h1-custom-primary">Your Matching Overview</h1>

        <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
          <li className="step step-primary">Enter personal information</li>
          <li className="step step-primary">
            Enter target universities & subjects
          </li>
          <li className="step step-accent">Choose your best mentor match</li>
          <li className="step">Wait for mentor acceptance</li>

          <li className="step">Start your mentorship journey</li>
          <li className="step">Apply to your dream uni!</li>
        </ul>
      </div>
      <div className="card blurry">
        <h2 className="h2-custom-primary">Your Top Matches</h2>
        <LoaderComponent />
      </div>
    </main>
  );
}
