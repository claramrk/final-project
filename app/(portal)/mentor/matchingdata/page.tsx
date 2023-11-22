import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMentorUniversityBackgroundbyUserID } from '../../../../database/mentorUniversityBackground';
import { getRoleByName } from '../../../../database/roles';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getUserBySessionToken } from '../../../../database/users';
import MentorMatchingInfoFormComponent from './MentorMatchingInfoFormComponent';
import MentorUniBackgroundTableComponent from './MentorUniBackgroundTableComponent';
import MentorUniversityBackgroundFormComponent from './MentorUniversityBackgroundFormComponent';

export default async function matchingdataMentors() {
  const subjects = await getSubjects();
  const universities = await getUniversities();
  const roleFromDatabase = await getRoleByName('approved mentor');

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect(`../signIn`);

  const userBackground = await getMentorUniversityBackgroundbyUserID(
    Number(currentUser.id),
  );
  if (!roleFromDatabase) redirect(`../signIn`);

  return (
    <main>
      <div className="card blurry">
        <h1 className="h1-custom-primary">Hi, {currentUser.firstname}!</h1>
        {userBackground.length < 1 ? (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-accent ">Enter academic background</li>
            <li className="step">Submit registration & enter mentor pool</li>
            <li className="step ">Wait for mentee match request</li>

            <li className="step">Accept request within one week</li>
            <li className="step">& start your mentorship journey</li>
          </ul>
        ) : (
          <ul className="steps hidden sm:mb-1 sm:flex sm:justify-center">
            <li className="step step-primary">Enter personal information</li>
            <li className="step step-primary">Enter academic background</li>
            <li className="step step-accent">
              Submit registration & enter mentor pool
            </li>
            <li className="step ">Wait for mentee match request</li>

            <li className="step">Accept request within one week</li>
            <li className="step">& start your mentorship journey</li>
          </ul>
        )}
      </div>
      <div className="card blurry">
        <h2 className="h2-custom-primary">Submit your University Background</h2>

        <div>
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
        <div>
          <div className="overflow-x-auto">
            <MentorUniBackgroundTableComponent id={currentUser.id} />
          </div>
        </div>
      </div>
      <div>
        <MentorMatchingInfoFormComponent
          userdata={currentUser}
          role={roleFromDatabase}
        />
      </div>
    </main>
  );
}
