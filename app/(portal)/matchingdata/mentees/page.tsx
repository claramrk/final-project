import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMenteeTargetUniversitySubjectbyUserID } from '../../../../database/menteeTargetUniversitySubject';
import { getRoleByName } from '../../../../database/roles';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';
import { getAllUsers, getUserBySessionToken } from '../../../../database/users';
import UpdateRolesButtonComponent from '../../../components/UpdateRolesButtonComponent';
import MenteeTargetUniversitySubjectFormComponent from './MenteeTargetUniversitySubjectFormComponent';

export default async function menteeMatchingData() {
  const subjects = await getSubjects();
  const universities = await getUniversities();
  const allUsers = await getAllUsers();
  const roleAsId = await getRoleByName('complete mentee');

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
        <h1 className="text-3xl">My Matching Information</h1>
      </div>
      <div id="universityInformationSection" className="card blurry">
        <h2 className="text-2xl">Study Information</h2>
        <h3 className="text-xl">
          Indicate the universities & subjects you want ot apply for!
        </h3>
        <p>
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
        <p>Current indications: {JSON.stringify(userTargets)}</p>
      </div>
      <div id="matchingInformationSection" className="card blurry">
        <h2 className="text-2xl">Further Information</h2>
        <form>
          <h3 className="text-xl">Mentee Guidelines</h3>
          <p>
            Our mentors take their time to help mentees on a voluntary basis. We
            hope you use this time respectfully. Therefore, we have set up
            mentee guidelines, that we expect you to adhere to.
          </p>
          <a
            // check how to download a pdf
            href="/#"
          >
            Mentee Guideline Contract Download
          </a>
          <label htmlFor="mentee_guideline_upload">
            Please download the mentee Guideline contract, read it carefully and
            upload a signed version here:
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            id="mentee_guideline_upload"
            type="file"

            // check how to upload a pdf
          />
          <button className="btn max-w-xs		" id="submitAllUniInformation">
            Submit further information
          </button>
        </form>
      </div>
      <div id="finalizeRegistrationSection" className="card blurry">
        <p>
          After clicking the "Register" button below our team will review your
          registration. After your registration is approved, you will then be
          able to request one mentor from our suggestion of fitting mentors.
          After sending your request, mentors will have one week to accept your
          request to start your mentorship journey together. You will also be
          supported through additional support programs - stay tuned!
        </p>
        <UpdateRolesButtonComponent
          userdata={currentUser}
          roleAsId={roleAsId?.id}
          buttonText="Complete your registration as a mentee"
          redirectTo="/dashboard/mentees"
          // should be available only when other info has been submitted
        />
      </div>
    </main>
  );
}
