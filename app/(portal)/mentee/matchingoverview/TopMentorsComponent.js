import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAttendanceTypeById } from '../../../../database/attendancetype';
import { getDegreeTypeById } from '../../../../database/degreetype';
import {
  getSingleUserWithMentorUniversityBackgroundbyUserIDWithUniAndSubjectJSONROW,
  getUserById,
  getUserBySessionToken,
} from '../../../../database/users';
import getTopThreeMentors from '../../../../util/matchingAlgorithm';
import RequestMentorFormComponent from './RequestMentorFormComponent';

export default async function TopMentorsComponent() {
  const sessionTokenCookie = cookies().get('sessionToken');

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

  return (
    <>
      <div id="requestedMatchesSection" className="card blurry">
        <h2 className="h2-custom-primary">Your Top Matches</h2>
        <div id="requestMentor">
          <p className="p-custom-primary">
            Below you can find three mentors from our pool that are currently
            available and that fit best to your university and subject
            indications.
          </p>
          {topThreeMentorsList.map(async (d) => {
            const mentorUserDataWithUniInfoObjectROW =
              await getMentorUserDataWithUniInfoObject(d.mentorUserId);

            const uniBackgroundtoMap = await getMentorUniBackgroundArray(
              mentorUserDataWithUniInfoObjectROW,
            );

            return (
              <div key={`uniqueID-${topThreeMentorsList.id}`}>
                <details className="collapse card blurry collapse-arrow">
                  <summary className="collapse-title text-xl font-medium">
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
                  </summary>
                  <div className="collapse-content">
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
                                  <p className="tablefont-custom-primary">
                                    {studylevelName.name}
                                  </p>

                                  <p className="tablefont-custom-secondary">
                                    {attendancetypeName.name}
                                  </p>
                                </td>
                                <td>
                                  <p className="tablefont-custom-primary">
                                    {e.universities[0].name}
                                  </p>

                                  <p className="tablefont-custom-secondary">
                                    {e.universities[0].countryId}
                                  </p>
                                </td>
                                <td>
                                  <p className="tablefont-custom-primary">
                                    {e.subjects[0].name.length > 60
                                      ? `${e.subjects[0].name.slice(0, 60)}...`
                                      : e.subjects[0].name}
                                  </p>

                                  <p className="tablefont-custom-secondary">
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
                </details>
              </div>
            );
          })}
        </div>
      </div>
      <RequestMentorFormComponent
        topThreeMentorsWithPersonalDataList={
          await topThreeMentorsWithPersonalDataList
        }
        currentUser={currentUser}
      />
    </>
  );
}
