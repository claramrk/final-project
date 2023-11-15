import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMentorId } from '../../../../database/matches';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import MatchRequestResponseComponent from './MatchRequestResponseComponent';
import MentoringEndFormComponent from './MentoringEndFormComponent';

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

  const currentUserMatchAccceptsData = Promise.all(
    currentUserMatchAccepts.map((m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  // get only Match Requests
  const currentUserMatchRequests = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentee requested mentor',
  );

  const currentUserMatchRequestsData = Promise.all(
    currentUserMatchRequests.map((m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">
          {currentUser.firstname}s' Matching Overview
        </h1>
      </div>
      <div id="activeMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Active Matches</h2>
        <p className="p-custom-primary">
          Active mentorships with mentees will show up below. Please let us know
          when a mentorship has ended so we can rematch you. Indicated max.
          capacity: XYZ
        </p>

        <div
          id="exampleActiveMatchesList"
          // filter matching list here
        >
          {currentUserMatches.map((m) => {
            return (
              <div
                id="exampleActiveMatch"
                className="card sub-blurry"
                key={`mentee-${m.id}`}
              >
                Active Match #1: | Menteename | Mentee contact info | Mentee
                targetunis | Mentee targetsubjects | mentee targetstudylevel |
                Match active since: DATE
                <button className="btn-custom-primary">
                  I am no longer mentoring this mentee
                </button>
                <MentoringEndFormComponent match={m} />
              </div>
            );
          })}
        </div>
      </div>
      <div id="requestedMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Match Requests</h2>
        <p className="p-custom-primary">
          Unanswered requests from mentees will show up below. You have one week
          to respond to a match request. Afterwards, the request will
          automatically be rejected.
        </p>

        <div
          id="exampleRequestedMatchesList"
          // filter matching list here
        >
          {currentUserMatchRequests.map((m) => {
            return (
              <div key={`mentee-${m.id}`}>
                <MatchRequestResponseComponent match={m} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
