'use client';

import { useRouter } from 'next/navigation';
import { UserAll } from '../../../../migrations/00008-createTableUsers';

type Props = {
  userdata: UserAll;
  roleAsId: number;
};

export default function CompleteRegistrationButtonComponent(props: Props) {
  const router = useRouter();

  console.log(props.roleAsId);
  async function handleCompleteRegistration() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.roleAsId),
      }),
    });
    // await router.push(`/mentee/matchingoverview`);

    await router.refresh();
  }

  return (
    <button className="btn-custom-primary">
      Complete your registration as a mentee
    </button>
  );
}
