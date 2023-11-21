import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMatchesByMenteeId } from '../../../../database/matches';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import MentoringEndFormComponent from '../../../components/MentoringEndFormComponent';
import MentorTableComponent from '../../../components/MentorTableComponent';

export default async function dashboardMentors() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  // get all Match Requests

  const currentUserMatches = await getMatchesByMenteeId(Number(currentUser.id));

  // filter to only Accepted Matches
  const currentUserMatchAccepts = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentor accepted match',
  );

  // filter to only Match Requests
  const currentUserMatchRequests = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentee requested mentor',
  );

  // filter to only past matches
  /*   const currentUserPastMatches = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentorship ended',
  ); */

  // get User Data function

  async function getUserData(id: number) {
    const user = await getUserById(id);
    return user;
  }

  return (
    <main id="visibleMENTEES">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">Your Matching Overview</h1>

        {currentUserMatchRequests.length > 0 ? (
          <ul className="steps">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">
              Enter target universities & subjects
            </li>
            <li className="step step-primary">Choose your best mentor match</li>
            <li className="step step-accent">Wait for mentor acceptance</li>

            <li className="step">Start your mentorship journey</li>
            <li className="step">Apply to your dream uni!</li>
          </ul>
        ) : (
          ''
        )}
        {currentUserMatchAccepts.length > 0 ? (
          <ul className="steps">
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

      {currentUserMatchRequests.length > 0 ? (
        <div id="requestedMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">You requested a mentor!</h2>
          <div id="sentRequests">
            <p className="p-custom-primary">
              We let your mentor know about your request! A mentor has one week
              to accept or reject your match request. In case they do not
              respond within the week, the request will automatically be
              rejected and you can request a new mentor.
            </p>
            {currentUserMatchRequests.map(async (u) => {
              const userData = await getUserData(u.mentorUserId);
              return (
                <div
                  key={`id-${u.id}`}
                  data-testId={`id-${currentUserMatchRequests.length}-requested`}
                >
                  <MentorTableComponent
                    id={userData?.id}
                    badgetext="requested"
                    badgecolor="badge badge-secondary badge-outline"
                    photo={userData?.photo}
                    email={userData?.email}
                    firstname={userData?.firstname}
                    countryId={userData?.countryId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}

      {currentUserMatchAccepts.length > 0 ? (
        <div id="activeMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">Your Mentor is confirmed!</h2>
          {currentUserMatchAccepts.map(async (u) => {
            const userData = await getUserData(u.mentorUserId);

            return (
              <div key={`id-${u.id}`}>
                <MentorTableComponent
                  id={userData?.id}
                  badgetext="accepted"
                  badgecolor="badge badge-accent badge-outline"
                  photo={userData?.photo}
                  email={userData?.email}
                  firstname={userData?.firstname}
                  countryId={userData?.countryId}
                />
                <p className="p-custom-primary">
                  {userData?.firstname}'s contact information will be sent to
                  you via Email{' '}
                </p>
                <MentoringEndFormComponent
                  match={u}
                  buttonText="I am no longer being mentored by this mentor"
                />
              </div>
            );
          })}
          {/*  {currentUserMatchAccepts.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="card sub-blurry">
                <p className="p-custom-primary">
                  Active Match Mentorphoto | | Mentor contact info | Mentor uni
                  & subject & studylevel 1 | Mentor uni & subject & studylevel 2
                  | Mentor uni & subject & studylevel 3 | Match active since:
                  DATE
                </p>
                <MentoringEndFormComponent
                  match={m}
                  buttonText="I am no longer being mentored by this mentor"
                />
              </div>
            );
          })} */}
        </div>
      ) : (
        ''
      )}
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Dashboard</h1>
      </div>
      <div id="matchingHighlightsSection" className="card blurry">
        <h2 className="h2-custom-primary">My Matching Highlights</h2>
        <h3 className="h3-custom-primary">My Pending Requests: </h3>
        <p className="p-custom-primary">
          ACTION NEEDED - Match Request #1: Menteephoto | Menteename | Date of
          request: DATE
        </p>
        <button
          className="btn-custom-primary"
          // leads to matching page
        >
          Respond to match request
        </button>
        <h3 className="h3-custom-primary">My Active Matches:</h3>
        <p className="p-custom-primary">
          Active Match #1: Menteephoto | Menteename | Match active since: DATE
        </p>

        <Link className="link-custom-primary" href="/mentor/matchingoverview">
          Go to Matching Page <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div id="profileSection" className="card blurry">
        <h2 className="h2-custom-primary">My Profile Highlights</h2>
        <p className="p-custom-primary">
          User Photo | User Name | User Role | User activity status
        </p>

        <Link className="link-custom-primary" href="/personaldata">
          Go to Profile Page <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div id="communicationSection" className="card blurry">
        <h2 className="h2-custom-primary">More Information</h2>
        <p className="p-custom-primary">Info 1</p>
        <p className="p-custom-primary">Info 2</p>
      </div>
    </main>
  );
}
