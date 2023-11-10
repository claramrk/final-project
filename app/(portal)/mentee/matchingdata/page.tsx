import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMenteeTargetUniversitySubjectbyUserID } from '../../../../database/menteeTargetUniversitySubject';
import { getRoleByName } from '../../../../database/roles';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getUserBySessionToken } from '../../../../database/users';
import MenteeMatchingInfoFormComponent from './MenteeMatchingInfoFormComponent';
import MenteeTargetUniversitySubjectFormComponent from './MenteeTargetUniversitySubjectFormComponent';

export default async function menteeMatchingData() {
  const subjects = await getSubjects();
  const universities = await getUniversities();
  const roleAsId = await getRoleByName('approved mentee');

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  const userTargets = await getMenteeTargetUniversitySubjectbyUserID(
    Number(currentUser?.id),
  );

  if (!currentUser) redirect('/signIn?returnTo=/notes');
  if (!roleAsId) {
    console.log('issue with role!');
  }

  return (
    <main id="visibleMENTEES">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Matching Information</h1>
      </div>
      <div id="universityInformationSection" className="card blurry">
        <h2 className="h2-custom-primary">Study Information</h2>
        <h3 className="h3-custom-primary">
          Indicate the universities & subjects you want ot apply for!
        </h3>
        <p className="p-custom-primary">
          The following information will be used to match your mentor, so we
          encourage you to give your submission prior thought! In case you do
          not know some answers yet, just provide the information that is the
          most accurate.
        </p>
        <MenteeTargetUniversitySubjectFormComponent
          universities={universities}
          subjects={subjects}
          userdata={currentUser}
        />
        <p className="p-custom-primary">
          Current indications: {JSON.stringify(userTargets)}
        </p>
      </div>
      <div id="matchingInformationSection" className="card blurry">
        <h2 className="h2-custom-primary">Further Information</h2>
        <MenteeMatchingInfoFormComponent
          userdata={await currentUser}
          role={await roleAsId}
        />
      </div>
    </main>
  );
}
