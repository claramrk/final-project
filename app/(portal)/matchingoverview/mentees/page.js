import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAttendanceTypeById } from '../../../../database/attendancetype';
import { getDegreeTypeById } from '../../../../database/degreetype';
import {
  getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW,
  getUserById,
  getUserBySessionToken,
} from '../../../../database/users';
import getTopThreeMentors from '../../../../util/matchingAlgorythm';
import RequestMentorTableComponent from './RequestMentorTableComponent';

export default async function matchingOverviewMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = await cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signIn?returnTo=/signUp');

  const currentUserEmail = currentUser.email;

  const topThreeMentorsList = await getTopThreeMentors(currentUserEmail);

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
      await mentorUserDataWithUniInfoObject[0].rowToJson;
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

    const uniBackgroundtoMap = await mentorUniBackgroundArray.sort(
      compareByStudylevel,
    );
    console.log(uniBackgroundtoMap);
    return await uniBackgroundtoMap;
  }

  return (
    <main id="visibleMENTEES">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="text-3xl">My Matching Overview</h1>
      </div>

      <div id="requestedMatchesSection" className="card blurry">
        <h2 className="text-2xl">Request a Mentor</h2>
        <div
          id="requestMentor"
          // filter matching list here. only active if no active mentor and if there is no active mentor request
        >
          <p>
            Below you can find three mentors from our pool that are currently
            available and that fit best to your university and subject
            indications.
          </p>
          <div className="card sub-blurry">
            <table className="table table-fixed">
              <thead>
                <tr>
                  <th>Mentor name</th>
                </tr>
              </thead>
              <tbody>
                {topThreeMentorsList.map(async (d) => {
                  const mentorUserDataWithUniInfoObjectROW =
                    await getMentorUserDataWithUniInfoObject(d.mentorUserId);

                  const uniBackgroundtoMap = await getMentorUniBackgroundArray(
                    mentorUserDataWithUniInfoObjectROW,
                  );

                  return (
                    <tr
                      id="exampleMentorUniversityBackground"
                      key={`uniqueID-${mentorUserDataWithUniInfoObjectROW.id}`}
                    >
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar mr-4">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src="data:image/jpeg;base64,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"
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
                                // mentorUserDataWithUniInfoObjectROW.countries[0]
                                // .name
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <table>
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
                                    {e.universities[0].name}
                                    <br />

                                    <span className="badge badge-ghost badge-sm">
                                      {e.universities[0].countryId}
                                    </span>
                                  </td>
                                  <td>
                                    {e.subjects[0].name.length > 60
                                      ? `${e.subjects[0].name.slice(0, 60)}...`
                                      : e.subjects[0].name}
                                    <br />

                                    <span className="badge badge-ghost badge-sm">
                                      {e.subjects[0].discipline}
                                    </span>
                                  </td>
                                  <td>
                                    {studylevelName.name}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                      {attendancetypeName.name}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div
            id="exampleMentorRequestList"
            className="card sub-blurry"

            // filter matching list here. can only be one at a time
          >
            <h3 className="text-xl">Send your Request</h3>

            <RequestMentorTableComponent
              topThreeMentorsWithPersonalDataList={
                await topThreeMentorsWithPersonalDataList
              }
            />
          </div>
        </div>
      </div>
      <div id="activeMatchesSection" className="card blurry">
        <h2 className="text-2xl">Active Matches</h2>
        <div
          id="exampleActiveMatch"
          className="card sub-blurry"
          // filter matching list here. can only be one person!
        >
          <p>
            Active Match Mentorphoto | Mentorname | Mentor contact info | Mentor
            uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
            Mentor uni & subject & studylevel 3 | Match active since: DATE
          </p>
          <button className="btn max-w-xs		">
            EDIT? how is a mentorship ended?
          </button>
        </div>
      </div>
      <div id="requestedMatchesSection" className="card blurry">
        <div
          id="sentRequests"
          // filter matching list here. only active if no active mentor and if there is a mentor request
        >
          <h2 className="text-2xl">Requested Matches</h2>
          <p>
            A mentor has one week to accept or reject your match request. If
            they have not answered, the request will automatically be rejected
            and you can request a new mentor.
          </p>

          <div
            id="exampleRequestedMatch"
            className="card sub-blurry"

            // filter matching list here. can only be one at a time
          >
            <p>
              Match Request: Mentorphoto | Mentorname | Mentor uni & subject &
              studylevel 1 | Mentor uni & subject & studylevel 2 | Mentor uni &
              subject & studylevel 3| Message to mentor | Date of request: DATE
            </p>
          </div>
        </div>
      </div>
      <div id="pastMatchesSection" className="card blurry">
        <h2 className="text-2xl">Past Matches</h2>
        <p id="examplePastMatch" className="card sub-blurry">
          Past Match #1: Mentorphoto | Mentorname | Mentor contact info | Mentor
          uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
          Mentor uni & subject & studylevel 3 | Match ended on: DATE
        </p>
        <p id="examplePastMatch" className="card sub-blurry">
          Past Match #2: Mentorphoto | Mentorname | Mentor contact info | Mentor
          uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
          Mentor uni & subject & studylevel 3 | Match ended on: DATE
        </p>
      </div>
    </main>
  );
}
