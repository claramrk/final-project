import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMenteeTargetUniversitySubjectbyUserID } from '../../../../database/menteeTargetUniversitySubject';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import getTopThreeMentors from '../../../../util/matchingAlgorythm';

export default async function dashboardMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  const userTargets = await getMenteeTargetUniversitySubjectbyUserID(
    Number(currentUser?.id),
  );

  if (!currentUser) redirect('/signIn?returnTo=/notes');

  const currentUserEmail = currentUser.email;

  const topThreeMentorsList = await getTopThreeMentors(currentUserEmail);

  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="text-3xl">My Dashboard</h1>
      </div>

      <h2>Top 3 matches:</h2>

      {topThreeMentorsList.map(async (d) => {
        const mentorUserData = await getUserById(d.mentorUserId);
        return <p key={`dataID-select-${d.mentorUserId}`}> </p>;
      })}
      <div
        id="matchingInformationSection_visibleMENTORS"
        className="card blurry"
      >
        <div id="matchingHighlightsSection" className="card blurry">
          <h2 className="text-2xl">My Matching Highlights</h2>

          <p>
            Active Match #1: Menteephoto | Menteename | Match active since: DATE
          </p>
          <a href="/matchingoverview/mentors">Go to Matching Page</a>
        </div>
        <div id="profileSection" className="card blurry">
          <h2 className="text-2xl">My Profile Highlights</h2>
          <p>User Photo | User Name | User Role | User activity status</p>
          <a href="/users">Go to Profile Page</a>
        </div>
        <div id="communicationSection" className="card blurry">
          <h2 className="text-2xl">More Information</h2>
          <p>Info 1</p>
          <p>Info 2</p>
          <p>Info 3</p>
        </div>
      </div>
    </main>
  );
}
