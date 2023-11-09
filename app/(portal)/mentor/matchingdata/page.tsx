import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMentorUniversityBackgroundbyUserID } from '../../../../database/mentorUniversityBackground';
import { getRoleByName } from '../../../../database/roles';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getUserBySessionToken } from '../../../../database/users';
import UpdateRolesButtonComponent from '../../../components/UpdateRolesButtonComponent';
import MentorMatchingInfoFormComponent from './MentorMatchingInfoFormComponent';
import MentorUniversityBackgroundFormComponent from './MentorUniversityBackgroundFormComponent';

export default async function matchingdataMentors() {
  const subjects = await getSubjects();
  const universities = await getUniversities();
  const roleAsId = await getRoleByName('complete mentor');

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  const userBackground = await getMentorUniversityBackgroundbyUserID(
    Number(currentUser?.id),
  );

  if (!currentUser) redirect('/login?returnTo=/notes');

  return (
    <main id="visibleMENTORS">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Matching Information</h1>
      </div>
      <div
        id="universityInformationSection_visibleMENTORS"
        className="card blurry"
      >
        <h2 className="h2-custom-primary">University Information</h2>

        <div id="submitNew">
          <h3 className="h3-custom-primary">
            Submit new University Background
          </h3>

          <p className="p-custom-primary">
            Please submit each degree you have completed or have been accepted
            to{' '}
          </p>
          <MentorUniversityBackgroundFormComponent
            universities={universities}
            subjects={subjects}
            userdata={currentUser}
          />
        </div>
        <div id="showSubmitted">
          <h3 className="h3-custom-primary">Submitted University Background</h3>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>University</th>
                  <th>Degree</th>
                  <th>Degree Type</th>
                  <th>Attendance Type</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {userBackground.length < 1
                  ? ''
                  : await userBackground.map((u) => {
                      return (
                        <tr
                          className="exampleMentorUniversityBackground"
                          key={`uniqueID-${u.id}`}
                        >
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">{u.universityId}</div>
                              <div>
                                <div className="font-bold">University Name</div>
                                <div className="text-sm opacity-50">
                                  University Country
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {u.subjectId} Name
                            <br />
                            <span className="badge badge-ghost badge-sm">
                              Discipline?
                            </span>
                          </td>
                          <td>{u.studylevel}</td>
                          <td>{u.attendanceType}</td>
                          <td>
                            <button className="btn btn-ghost btn-xs">
                              details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        id="matchingInformationSection_visibleMENTORS"
        className="card blurry"
      >
        <h2 className="h2-custom-primary">Matching Information</h2>
        <h3 className="h3-custom-primary">Maximum Capacity</h3>

        <MentorMatchingInfoFormComponent
          userdata={currentUser}
          role={roleAsId}
        />
      </div>
    </main>
  );
}
