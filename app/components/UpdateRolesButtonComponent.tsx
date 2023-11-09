'use client';

import { useRouter } from 'next/navigation';
import { UserAll } from '../../migrations/00004-createTableUsers';

type Props = {
  userdata: UserAll;
  roleAsId: number | undefined;
  buttonText: string;
};

export default function UpdateRolesButtonComponent(props: Props) {
  const router = useRouter();

  async function handleCompleteRegistration() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.roleAsId),
      }),
    });

    await router.refresh();
  }

  return (
    <button
      formAction={handleCompleteRegistration}
      className="btn-custom-primary"
      type="submit"
    >
      {props.buttonText}
    </button>
  );
}
