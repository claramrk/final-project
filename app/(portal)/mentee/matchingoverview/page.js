import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMenteeId } from '../../../../database/matches';
import { getUserBySessionToken } from '../../../../database/users';
import TopMentorsComponent from './TopMentorsComponent';

export default async function matchingOverviewMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  // get all Match Requests

  const currentUserMatches = await getMatchesByMenteeId(Number(currentUser.id));

  // get only Accepted Matches
  const currentUserMatchAccepts = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentor accepted match',
  );

  // get only Match Requests
  const currentUserMatchRequests = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentee requested mentor',
  );

  // get only past matches
  /*     const currentUserPastMatches = currentUserMatches.filter(
      (e) => e.statusInternal === 'mentorship ended',
    ); */

  return (
    <main>
      <div className="card blurry">
        <h1 className="h1-custom-primary">Your Matching Overview</h1>

        {currentUserMatchRequests.length < 1 ? (
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
        ) : (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">
              Enter target universities & subjects
            </li>
            <li className="step step-primary">Choose your best mentor match</li>
            <li className="step step-accent">Wait for mentor acceptance</li>

            <li className="step">Start your mentorship journey</li>
            <li className="step">Apply to your dream uni!</li>
          </ul>
        )}
        {currentUserMatchAccepts.length > 0 ? (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">
              Enter target universities & subjects
            </li>
            <li className="step step-primary">Choose your best mentor match</li>
            <li className="step step-primary">Wait for mentor acceptance</li>

            <li className="step step-accent">Start your mentorship journey</li>
            <li className="step">Apply to your dream uni!</li>
          </ul>
        ) : (
          ''
        )}
      </div>
      {!currentUserMatchRequests.length ? <TopMentorsComponent /> : ''}
    </main>
  );
}
