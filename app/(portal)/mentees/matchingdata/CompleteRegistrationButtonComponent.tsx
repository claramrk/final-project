'use client';

import { useRouter } from 'next/navigation';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

type Props = {
  userdata: UserAll;
  roleAsId: number | undefined;
};

export default function CompleteRegistrationButtonComponent(props: Props) {
  const router = useRouter();

  async function handleCompleteRegistration() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.roleAsId),
      }),
    });
    await router.push(`/mentees/dashboard`);

    await router.refresh();
  }

  return (
    <form>
      <button
        className="btn-custom-primary"
        formAction={handleCompleteRegistration}
      >
        Complete your registration as a mentee
      </button>
    </form>
  );
}
