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

  const reroute: any = '/mentee/loadingPage';

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
        <ul className="mt-8 mb-8 space-y-8 text-gray-600">
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mt-1 h-5 w-5 flex-none text-neutral"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <span>
              <strong className="font-semibold text-gray-900">
                Register:{' '}
              </strong>{' '}
              After clicking the "Register" button below, you will be able to
              request one mentor from our suggestion of fitting mentors for your
              application goals.
            </span>
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mt-1 h-5 w-5 flex-none text-neutral"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>

            <span>
              <strong className="font-semibold text-gray-900">
                Your Mentor:{' '}
              </strong>{' '}
              After sending your request, mentors will have one week to accept
              your request to start your mentorship journey together. Mentors
              take their time to help mentees on a voluntary basis. We expect
              that you use this time respectfully.
            </span>
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mt-1 h-5 w-5 flex-none text-neutral"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
              />
            </svg>
            <span>
              <strong className="font-semibold text-gray-900">
                Additonal Support:{' '}
              </strong>{' '}
              You will also be supported through additional initiatives from our
              internal team - stay tuned!
            </span>
          </li>
        </ul>
        <div className="flex justify-end	mb-5 mx-5">
          <button className="btn-custom-third" onClick={handleUpdateRole}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {'  '}
            Register as a mentee
          </button>
        </div>
      </form>
    </div>
  );
}
