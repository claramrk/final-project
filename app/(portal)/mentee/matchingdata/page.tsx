import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMenteeTargetUniversitySubjectbyUserID } from '../../../../database/menteeTargetUniversitySubject';
import { getRoleByName } from '../../../../database/roles';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getUserBySessionToken } from '../../../../database/users';
import MenteeHeaderComponent from '../../../components/MenteeHeaderComponent';
import MenteeTableComponent from '../../../components/MenteeTableComponent';
import MenteeMatchingInfoFormComponent from './MenteeMatchingInfoFormComponent';
import MenteeTargetUniversitySubjectFormComponent from './MenteeTargetUniversitySubjectFormComponent';

export default async function menteeMatchingData() {
  const subjects = await getSubjects();
  const universities = await getUniversities();
  const roleFromDatabase = await getRoleByName('approved mentee');

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect(`../signIn`);

  const userTargets = await getMenteeTargetUniversitySubjectbyUserID(
    Number(currentUser.id),
  );

  if (!roleFromDatabase) {
    redirect(`../error`);
  }

  return (
    <main>
      <MenteeHeaderComponent
        step={2}
        titleBold="Great"
        titleNormal="to meet you,"
        titleUnderlined={`${currentUser.firstname}.`}
      />
      {/*   <div className="card blurry">
        <h1 className="h1-custom-primary">Hi, {currentUser.firstname}!</h1>
        <ul
          className="steps hidden sm:mb-1 sm:flex sm:justify-center
 "
        >
          <li className="step step-primary">Enter personal information</li>
          <li className="step step-accent">
            Enter target universities & subjects
          </li>

          <li className="step">Choose your best mentor match</li>
          <li className="step">Wait for mentor acceptance</li>

          <li className="step">Start your mentorship journey</li>
          <li className="step">Apply to your dream uni!</li>
        </ul>
      </div> */}
      {userTargets.length < 1 ? (
        <div className="card blurry">
          <h2 className="h2-custom-primary">
            {' '}
            Indicate the universities & subjects you want to apply to!
          </h2>

          <p className="p-custom-primary">
            The following information will be used to match your mentor, so we
            encourage you to give your submission prior thought!
          </p>
          <MenteeTargetUniversitySubjectFormComponent
            universities={universities}
            subjects={subjects}
            userdata={currentUser}
          />
        </div>
      ) : (
        <>
          <div className="card blurry">
            <h2 className="h2-custom-primary">
              {' '}
              Your submitted target universities & subjects:{' '}
            </h2>
            <div className="card blurry">
              <MenteeTableComponent
                badgetext="submitted"
                badgecolor="badge badge-accent badge-outline"
                menteeMatchId={currentUser.id}
              />
            </div>
          </div>
          <div>
            <MenteeMatchingInfoFormComponent
              userdata={currentUser}
              role={roleFromDatabase}
            />
          </div>
        </>
      )}
    </main>
  );
}
