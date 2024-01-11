import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMenteeId } from '../../../../database/matches';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import MenteeHeaderComponent from '../../../components/MenteeHeaderComponent';
import MentoringEndFormComponent from '../../../components/MentoringEndFormComponent';
import MentorTableComponent from '../../../components/MentorTableComponent';

export default async function dashboard() {
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
  const currentUserPastMatches = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentorship ended',
  );

  // get User Data function

  async function getUserData(id: number) {
    const user = await getUserById(id);
    return user;
  }

  return (
    <main>
      {currentUserMatchRequests.length > 0 ? (
        <MenteeHeaderComponent
          step={[1, 2, 3, 4, 5]}
          titleBold="Time"
          titleNormal="to wait for your mentor's"
          titleUnderlined="answer."
        />
      ) : (
        ''
      )}
      {currentUserMatchAccepts.length > 0 ? (
        <MenteeHeaderComponent
          step={[1, 2, 3, 4, 5, 6]}
          titleBold="Let's"
          titleNormal="start your journey to your"
          titleUnderlined="dream uni."
        />
      ) : (
        ''
      )}
      {currentUserPastMatches.length > 0 ? (
        <MenteeHeaderComponent
          step={[1, 2, 3, 4, 5, 6, 7]}
          titleBold="Congrats!"
          titleNormal="Have the best time at your"
          titleUnderlined="dream uni."
        />
      ) : (
        ''
      )}

      {currentUserMatchRequests.length > 0 ? (
        <div className="card blurry">
          <h2 className="h2-custom-primary">You requested a mentor!</h2>
          <div>
            <p className="p-custom-primary">
              We let your mentor know about your request! A mentor has one week
              to accept or reject your match request. In case they do not
              respond within the week, the request will automatically be
              rejected and you can request a new mentor.
            </p>
            {currentUserMatchRequests.map(async (u) => {
              const userData = await getUserData(u.mentorUserId);
              return (
                <div key={`id-${u.id}`} data-test-id="requested-match">
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
        <div className="card blurry">
          <h2 className="h2-custom-primary">Your Mentor has confirmed!</h2>
          {currentUserMatchAccepts.map(async (u) => {
            const userData = await getUserData(u.mentorUserId);

            return (
              <div key={`id-${u.id}`}>
                <p className="p-custom-primary">
                  {userData?.firstname}'s contact information will be sent to
                  you via Email{' '}
                </p>
                <MentorTableComponent
                  id={userData?.id}
                  badgetext="accepted"
                  badgecolor="badge badge-accent badge-outline"
                  photo={userData?.photo}
                  email={userData?.email}
                  firstname={userData?.firstname}
                  countryId={userData?.countryId}
                />
                <MentoringEndFormComponent
                  match={u}
                  buttonText="Mentorship has ended"
                />
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
      {currentUserPastMatches.length > 0 ? (
        <div className="card blurry">
          <h2 className="h2-custom-primary">Inactive Matches</h2>
          {currentUserPastMatches.map(async (u) => {
            const userData = await getUserData(u.mentorUserId);

            return (
              <div key={`id-${u.id}`}>
                <MentorTableComponent
                  id={userData?.id}
                  badgetext="inactive"
                  badgecolor="badge badge-default badge-outline"
                  photo={userData?.photo}
                  email={userData?.email}
                  firstname={userData?.firstname}
                  countryId={userData?.countryId}
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
