import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAttendanceTypeById } from '../../../../database/attendancetype';
import { getDegreeTypeById } from '../../../../database/degreetype';
import { getMatchesByMenteeId } from '../../../../database/matches';
import {
  getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW,
  getUserById,
  getUserBySessionToken,
} from '../../../../database/users';
import getTopThreeMentors from '../../../../util/matchingAlgorythm';
import checkUniMatchColor from '../../../../util/showUniAndSubjectOverlap';
import ButtonGoBack from '../../../components/ButtonGoBack';
import RequestMentorFormComponent from './RequestMentorFormComponent';

export default async function matchingOverviewMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie =  cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  const topThreeMentorsList = await getTopThreeMentors(currentUser);

  const topThreeMentorsWithPersonalDataList = Promise.all(
    topThreeMentorsList.map((element) => {
      const user = getUserById(element.mentorUserId);
      return user;
    }),
  );

  async function getMentorUserDataWithUniInfoObject(id) {
    const mentorUserDataWithUniInfoObject =
      await getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW(
        id,
      );

    const mentorUserDataWithUniInfoObjectROW =
      mentorUserDataWithUniInfoObject[0].rowToJson;
    return mentorUserDataWithUniInfoObjectROW;
  }

  async function getMentorUniBackgroundArray(
    mentorUserDataWithUniInfoObjectROW,
  ) {
    const mentorUniBackgroundArray =
      await mentorUserDataWithUniInfoObjectROW.mentorUniversityBackgrounds;

    function compareByStudylevel(a, b) {
      return a.studylevel - b.studylevel;
    }

    const uniBackgroundtoMap =
      await mentorUniBackgroundArray.sort(compareByStudylevel);
    return await uniBackgroundtoMap;
  }

  const currentUserMatches = await getMatchesByMenteeId(Number(currentUser.id));
  /*   const currentUserMatchesData = Promise.all(
    currentUserMatches.map(async (m) => {
      const mentor = getUserById(m.mentorUserId);
      return mentor;
    }),
  ); */

  return (
    <main id="visibleMENTEES">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">
          {' '}
          {currentUser.firstname}'s Matching Overview
        </h1>
      </div>

      <div id="requestedMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Request a Mentor</h2>

        {currentUserMatches.length > 0 ? (
          <div
            id="sentRequests"
            // filter matching list here. only active if no active mentor and if there is a mentor request
          >
            <p className="p-custom-primary">
              You requested a mentor! A mentor has one week to accept or reject
              your match request. In case they do not respond within the week,
              the request will automatically be rejected and you can request a
              new mentor.
            </p>
            <div
              id="exampleRequestedMatch"
              className="card sub-blurry"

              // filter matching list here. can only be one at a time
            >
              <p className="p-custom-primary">
                Match Request: Mentorphoto | {} | Mentor uni & subject &
                studylevel 1 | Mentor uni & subject & studylevel 2 | Mentor uni
                & subject & studylevel 3| Message to mentor | Date of request:
                DATE
              </p>
            </div>
          </div>
        ) : (
          <div
            id="requestMentor"
            // filter matching list here. only active if no active mentor and if there is no active mentor request
          >
            <p className="p-custom-primary">
              Below you can find three mentors from our pool that are currently
              available and that fit best to your university and subject
              indications.
            </p>
            <div>
              {topThreeMentorsList.map(async (d) => {
                const mentorUserDataWithUniInfoObjectROW =
                  await getMentorUserDataWithUniInfoObject(d.mentorUserId);

                const uniBackgroundtoMap = await getMentorUniBackgroundArray(
                  mentorUserDataWithUniInfoObjectROW,
                );

                return (
                  <div
                    key={`uniqueID-${mentorUserDataWithUniInfoObjectROW.id}`}
                    className="card sub-blurry"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className="avatar mr-4">
                          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={
                                mentorUserDataWithUniInfoObjectROW.photo
                                  ? mentorUserDataWithUniInfoObjectROW.photo
                                  : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png'
                              }
                              alt={mentorUserDataWithUniInfoObjectROW.email}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {mentorUserDataWithUniInfoObjectROW.firstname}
                          </div>
                          <div className="text-sm opacity-50">
                            {
                              mentorUserDataWithUniInfoObjectROW.countries[0]
                                .name
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>University & Degreetype</th>
                            <th>Subject & Discipline</th>
                            <th>Attendance Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uniBackgroundtoMap.map((e) => {
                            const studylevelName = getDegreeTypeById(
                              Number(e.studylevel),
                            );
                            const attendancetypeName = getAttendanceTypeById(
                              Number(e.attendanceType),
                            );

                            return (
                              <tr key={`uniqueID-${e.id}`}>
                                <td>
                                  {studylevelName.name}
                                  <br />
                                  <p className="p-custom-primary">
                                    {attendancetypeName.name}
                                  </p>
                                </td>
                                <td
                                  // doesnt work yet
                                  className={
                                    checkUniMatchColor(
                                      e.universities[0],
                                      currentUser,
                                    ) === true
                                      ? 'text-lg'
                                      : 'bg-blue'
                                  }
                                >
                                  {e.universities[0].name}
                                  <br />

                                  <p className="p-custom-primary">
                                    {e.universities[0].countryId}
                                  </p>
                                </td>
                                <td>
                                  {e.subjects[0].name.length > 60
                                    ? `${e.subjects[0].name.slice(0, 60)}...`
                                    : e.subjects[0].name}
                                  <br />

                                  <p className="p-custom-primary">
                                    {e.subjects[0].discipline}
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              id="exampleMentorRequestList"
              className="card sub-blurry"

              // filter matching list here. can only be one at a time
            >
              <h3 className="h3-custom-primary">Send your Request</h3>

              <RequestMentorFormComponent
                topThreeMentorsWithPersonalDataList={
                  await topThreeMentorsWithPersonalDataList
                }
                currentUser={currentUser}
              />
            </div>
          </div>
        )}
      </div>
      <div id="activeMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Active Matches</h2>
        <div
          id="exampleActiveMatch"
          className="card sub-blurry"
          // filter matching list here. can only be one person!
        >
          <p className="p-custom-primary">
            Active Match Mentorphoto | Mentorname | Mentor contact info | Mentor
            uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
            Mentor uni & subject & studylevel 3 | Match active since: DATE
          </p>
          <button className="btn-custom-primary">
            I am no longer being mentored by this mentor
          </button>
        </div>
      </div>
      <ButtonGoBack />
    </main>
  );
}
