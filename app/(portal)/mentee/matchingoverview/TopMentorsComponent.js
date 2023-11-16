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

/* type Props={
  currentUser: UserAll[]
} */

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

    console.log(mentorUserDataWithUniInfoObject);
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
      {topThreeMentorsList.map(async (d) => {
        const mentorUserDataWithUniInfoObjectROW =
          await getMentorUserDataWithUniInfoObject(d.mentorUserId);

        const uniBackgroundtoMap = await getMentorUniBackgroundArray(
          mentorUserDataWithUniInfoObjectROW,
        );

        return (
          <div
            key={`uniqueID-${topThreeMentorsList.id}`}
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
                    {mentorUserDataWithUniInfoObjectROW.countries[0].name}
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
                        <td>
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
    </>
  );
}
