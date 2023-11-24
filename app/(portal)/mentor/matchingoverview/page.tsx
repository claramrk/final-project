import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMentorId } from '../../../../database/matches';
import { getUserBySessionToken } from '../../../../database/users';
import MenteeTableComponent from '../../../components/MenteeTableComponent';
import MentoringEndFormComponent from '../../../components/MentoringEndFormComponent';
import MatchResponseComponent from './MatchResponseComponent';

export default async function matchingOverviewMentors() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) {
    redirect('/signUp');
  }

  const currentUserMatches = await getMatchesByMentorId(Number(currentUser.id));

  // get only Accepted Matches
  const currentUserMatchAccepts = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentor accepted match',
  );

  // get only Match Requests
  const currentUserMatchRequests = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentee requested mentor',
  );

  // get only past matches
  const currentUserPastMatches = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentorship ended',
  );

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">
          {currentUser.firstname}s' Matching Overview
        </h1>
        {currentUserMatchRequests.length < 1 &&
        currentUserMatchAccepts.length < 1 &&
        currentUserPastMatches.length < 1 ? (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">Enter academic background</li>
            <li className="step step-primary">
              Submit registration & enter mentor pool
            </li>
            <li className="step step-accent">Wait for mentee match request</li>

            <li className="step">Accept request within one week</li>
            <li className="step">Start your mentorship journey</li>
          </ul>
        ) : (
          ''
        )}
        {currentUserMatchAccepts.length > 0 ? (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">Enter academic background</li>
            <li className="step step-primary">
              Submit registration & enter mentor pool
            </li>
            <li className="step step-primary">Wait for mentee match request</li>

            <li className="step step-primary">
              Accept request within one week
            </li>
            <li className="step step-accent">Start your mentorship journey</li>
          </ul>
        ) : (
          ''
        )}
        {currentUserMatchRequests.length > 0 &&
        currentUserMatchAccepts.length < 1 ? (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">Enter academic background</li>
            <li className="step step-primary">
              Submit registration & enter mentor pool
            </li>
            <li className="step step-primary">Wait for mentee match request</li>

            <li className="step step-accent">Accept request within one week</li>
            <li className="step">Start your mentorship journey</li>
          </ul>
        ) : (
          ''
        )}
        {currentUserPastMatches.length > 0 &&
        currentUserMatchAccepts.length < 1 &&
        currentUserMatchRequests.length < 1 ? (
          <ul className="steps">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">Enter academic background</li>
            <li className="step step-primary">
              Submit registration & enter mentor pool
            </li>
            <li className="step step-accent">
              Wait for another mentee match request
            </li>

            <li className="step">Accept request within one week</li>
            <li className="step">Start your mentorship journey</li>
          </ul>
        ) : (
          ''
        )}
      </div>
      <div className="card blurry">
        <h2 className="h2-custom-primary">Match Requests</h2>
        <p className="p-custom-primary">
          Unanswered requests from mentees will show up below. You have one week
          to respond to a match request. Afterwards, the request will
          automatically be rejected.
        </p>

        <div
        // filter matching list here
        >
          {currentUserMatchRequests.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="mb-10">
                <MenteeTableComponent
                  badgetext="request"
                  badgecolor="badge badge-neutral badge-outline"
                  menteeMatchId={m.menteeUserId}
                />
                <MatchResponseComponent match={m} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="card blurry">
        <h2 className="h2-custom-primary">Active Matches</h2>
        <p className="p-custom-primary">
          Active mentorships with mentees will show up below. Please let us know
          when a mentorship has ended so we can rematch you.
        </p>

        <div
        // filter matching list here
        >
          {currentUserMatchAccepts.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="mb-10">
                <MenteeTableComponent
                  menteeMatchId={m.menteeUserId}
                  badgetext="active"
                  badgecolor="badge badge-accent badge-outline"
                />

                <MentoringEndFormComponent
                  match={m}
                  buttonText="Mentorship has ended"
                />
              </div>
            );
          })}
        </div>
      </div>

      {currentUserPastMatches.length > 0 ? (
        <div className="card blurry">
          <h2 className="h2-custom-primary">Inactive Matches</h2>

          {currentUserPastMatches.map((m) => {
            return (
              <div key={`mentee-${m.id}`}>
                <MenteeTableComponent
                  badgetext="inactive"
                  badgecolor="badge badge-default badge-outline"
                  menteeMatchId={m.menteeUserId}
                />
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </main>
  );
}
