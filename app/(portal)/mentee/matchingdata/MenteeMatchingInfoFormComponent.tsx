'use client';

import { useRouter } from 'next/navigation';
import { Role } from '../../../../migrations/00003-createTableRoles';
import { UserAll } from '../../../../migrations/00004-createTableUsers';
import UpdateRolesButtonComponent from '../../../components/UpdateRolesButtonComponent';

type Props = {
  userdata: UserAll;
  role: Role;
};

export default function MenteeMatchingInfoFormComponent(props: Props) {
  const router = useRouter();

  const reroute: any = props.role ? '/mentee/matchingoverview' : '/signIn';
  if (!props.role) {
    console.log('error');
  }

  async function handleUpdateRole() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.role.id),
      }),
    });
    // await router.push(`/mentee/matchingoverview`);

    await router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleUpdateRole();
        await router.push(reroute);
        await router.refresh();
      }}
    >
      <h3 className="h3-custom-primary">Mentee Guidelines</h3>
      <p className="p-custom-primary">
        Mentors take their time to help mentees on a voluntary basis. We hope
        you use this time respectfully.
      </p>

      {/*  <p>Therefore, we have set up mentee guidelines,
      that we expect you to adhere to.</p>
    <a
      className="link-custom-primary"
      // check how to download a pdf
      href="/#"
    >
      Mentee Guideline Contract Download
    </a>
    <label className="label-custom-primary" htmlFor="mentee_guideline_upload">
      Please download the mentee Guideline contract, read it carefully and upload
      a signed version here:
    </label>
    <input
      className="input-text-custom-primary"
      type="file"
      // check how to upload a pdf
    /> */}
      <div id="finalizeRegistrationSection" className="card blurry">
        <p className="p-custom-primary">
          After clicking the "Register" button below our team will review your
          registration. After your registration is approved, you will then be
          able to request one mentor from our suggestion of fitting mentors.
          After sending your request, mentors will have one week to accept your
          request to start your mentorship journey together. You will also be
          supported through additional support programs - stay tuned!
        </p>
        <button className="btn-custom-primary" onClick={handleUpdateRole}>
          Complete your registration as a mentee
        </button>
        <UpdateRolesButtonComponent
          userdata={props.userdata}
          roleAsId={props.role.id}
          buttonText="Complete your registration as a mentee"
          // should be available only when other info has been submitted
        />
      </div>
    </form>
  );
}
