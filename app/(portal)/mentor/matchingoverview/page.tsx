import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMentorId } from '../../../../database/matches';
import { getUserBySessionToken } from '../../../../database/users';
import MenteeTableComponent from '../../../components/MenteeTableComponent';
import MentorHeaderComponent from '../../../components/MentorHeaderComponent';
import MenteeCardActiveComponent from './MenteeCardActiveComponent';
import MenteeCardComponent from './MenteeCardComponent';

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
      {currentUserMatchRequests.length < 1 &&
      currentUserMatchAccepts.length < 1 &&
      currentUserPastMatches.length < 1 ? (
        <MentorHeaderComponent
          step={[1, 2, 3, 4, 5]}
          titleBold="Check"
          titleNormal="our your current"
          titleUnderlined="matches."
        />
      ) : (
        ''
      )}
      {currentUserMatchAccepts.length > 0 ? (
        <MentorHeaderComponent
          step={[1, 2, 3, 4, 5, 6, 7]}
          titleBold="Check"
          titleNormal="our your "
          titleUnderlined="current matches."
        />
      ) : (
        ''
      )}
      {currentUserMatchRequests.length > 0 &&
      currentUserMatchAccepts.length < 1 ? (
        <MentorHeaderComponent
          step={[1, 2, 3, 4, 5, 6]}
          titleBold="Check"
          titleNormal="our your "
          titleUnderlined="current matches."
        />
      ) : (
        ''
      )}
      {currentUserPastMatches.length > 0 &&
      currentUserMatchAccepts.length < 1 &&
      currentUserMatchRequests.length < 1 ? (
        <MentorHeaderComponent
          step={[1, 2, 3, 4, 5]}
          titleBold="Check"
          titleNormal="our your "
          titleUnderlined="current matches."
        />
      ) : (
        ''
      )}
      <div className="card blurry">
        <h2 className="h2-custom-primary">Match Requests</h2>
        <p className="p-custom-primary ">
          Unanswered requests from mentees will show up below. You have one week
          to respond to a match request. Afterwards, the request will
          automatically be rejected.
        </p>

        <div>
          {currentUserMatchRequests.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="">
                <MenteeCardComponent
                  badgetext="request"
                  badgecolor="badge badge-neutral badge-outline"
                  menteeMatchId={m.menteeUserId}
                  match={m}
                />
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

        <div>
          {currentUserMatchAccepts.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="mb-10">
                <MenteeCardActiveComponent
                  menteeMatchId={m.menteeUserId}
                  badgetext="active"
                  badgecolor="badge badge-accent badge-outline"
                  match={m}
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
