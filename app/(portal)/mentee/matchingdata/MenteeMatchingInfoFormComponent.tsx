'use client';

import { useRouter } from 'next/navigation';
import { Role } from '../../../../migrations/00006-createTableRoles';
import { UserAll } from '../../../../migrations/00008-createTableUsers';

type Props = {
  userdata: UserAll;
  role: Role;
};

export default function MenteeMatchingInfoFormComponent(props: Props) {
  const router = useRouter();

  const reroute: any = '/mentee/matchingoverview';

  async function handleUpdateRole() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.role.id),
      }),
    });

    router.refresh();
  }

  return (
    <div className="card blurry">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleUpdateRole();
          router.push(reroute);
          router.refresh();
        }}
      >
        <h2 className="h2-custom-primary">Further Information & next Steps</h2>
        <p className="p-custom-primary mt-2 mb-2">
          After clicking the "Register" button below, you will be able to
          request one mentor from our suggestion of fitting mentors for your
          application goals.
          <br />
          <br />
          After sending your request, mentors will have one week to accept your
          request to start your mentorship journey together. Mentors take their
          time to help mentees on a voluntary basis. We expect that you use this
          time respectfully.
          <br />
          <br />
          You will also be supported through additional initiatives from our
          internal team - stay tuned!
        </p>
        <button className="btn-custom-primary" onClick={handleUpdateRole}>
          Complete your registration as a mentee
        </button>
      </form>
    </div>
  );
}
