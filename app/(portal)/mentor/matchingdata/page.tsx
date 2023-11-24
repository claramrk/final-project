import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMentorUniversityBackgroundbyUserID } from '../../../../database/mentorUniversityBackground';
import { getRoleByName } from '../../../../database/roles';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getUserBySessionToken } from '../../../../database/users';
import MentorHeaderComponent from '../../../components/MentorHeaderComponent';
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
      {userBackground.length < 1 ? (
        <MentorHeaderComponent
          step={[1, 2]}
          titleBold="Great"
          titleNormal="to meet you,"
          titleUnderlined={`${currentUser.firstname}.`}
        />
      ) : (
        <MentorHeaderComponent
          step={[1, 2, 3]}
          titleBold="Great"
          titleNormal="to meet you,"
          titleUnderlined={`${currentUser.firstname}.`}
        />
      )}
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
        {userBackground.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <MentorUniBackgroundTableComponent id={currentUser.id} />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        <MentorMatchingInfoFormComponent
          userdata={currentUser}
          role={roleFromDatabase}
          uniBackground={userBackground.length > 0 ? true : false}
        />
      </div>
    </main>
  );
}
