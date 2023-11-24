'use client';

import { useRouter } from 'next/navigation';
import { UserAll } from '../../migrations/00008-createTableUsers';

type Props = {
  userdata: UserAll;
  roleFromDatabase: number;
  buttonText: string;
};

export default function UpdateRolesButtonComponent(props: Props) {
  const router = useRouter();

  async function handleCompleteRegistration() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.roleFromDatabase),
      }),
    });

    router.refresh();
  }

  return (
    <button
      formAction={handleCompleteRegistration}
      className="btn-custom-third "
    >
      {props.buttonText}
    </button>
  );
}
