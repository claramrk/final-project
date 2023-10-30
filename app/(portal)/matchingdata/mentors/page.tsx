import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMentorUniversityBackgroundbyUserID } from '../../../../database/mentorUniversityBackground';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getUserBySessionToken } from '../../../../database/users';
import MentorMatchingInfoFormComponent from './MentorMatchingInfoFormComponent';
import MentorUniversityBackgroundFormComponent from './MentorUniversityBackgroundFormComponent';

export default async function matchingdataMentors() {
  const subjects = await getSubjects();
  const universities = await getUniversities();

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
      <div className="pageHeaderSection">
        <h1>My Matching Information</h1>
      </div>
      <div id="universityInformationSection_visibleMENTORS">
        <h2>University Information</h2>

        <div id="submitNew">
          <h3>Submit new University Background</h3>

          <p>
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
          <h3>Submitted University Background</h3>
          <table>
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
              {!userBackground
                ? ''
                : await userBackground.map((u) => {
                    return (
                      <tr
                        className="exampleMentorUniversityBackground"
                        key={`uniqueID-${u.id}`}
                      >
                        <td>{u.universityId}</td>
                        <td>{u.subjectId}</td>
                        <td>{u.studylevel}</td>
                        <td>{u.attendanceType}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
      <div id="matchingInformationSection_visibleMENTORS">
        <h2>Matching Information</h2>
        <MentorMatchingInfoFormComponent userdata={currentUser} />
      </div>
      <p>
        After clicking the "Register" button below our team will review your
        registration. After your registration is approved, you will join the
        active mentor pool. Mentees will then be able to request you as their
        mentor after you have been suggested as a fitting mentor. After a
        mentee's request, you will have one week to accept the request to start
        your mentorship journey together. You can always set your mentorship to
        inactive in the future, in case you would like to take a break or
        discontinue mentoring.
      </p>
      <button id="registerAsAMentor">
        Complete your registration as a mentor
      </button>
    </main>
  );
}
