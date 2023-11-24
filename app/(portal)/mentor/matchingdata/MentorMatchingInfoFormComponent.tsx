'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../../migrations/00006-createTableRoles';
import { UserAll } from '../../../../migrations/00008-createTableUsers';
import UpdateRolesButtonComponent from '../../../components/UpdateRolesButtonComponent';

type Props = {
  userdata: UserAll;
  role: Role;
  uniBackground: boolean;
};

export default function MentorMatchingInfoFormComponent(props: Props) {
  const [maxCapacityInput, setMaxCapacityInput] = useState(0);
  const [nextInput, setNextInput] = useState('');

  const currentUser = props.userdata;

  const router = useRouter();

  async function handlePutMentorMatchingInfo() {
    const currentUserID = Number(props.userdata.id);

    await fetch('/../../../api/matchingdata/mentorMatchingInfo', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(currentUserID),
        maxCapacity: Number(maxCapacityInput),
      }),
    });
    router.refresh();
  }

  const reroute: any = `/mentor/matchingoverview`;

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
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handlePutMentorMatchingInfo();
        await handleUpdateRole();
        router.refresh();
        router.push(reroute);
      }}
    >
      <button
        className="btn-custom-third animate-bounce justify-end"
        onClick={() => setNextInput('true')}
      >
        Next ↓{' '}
      </button>

      {nextInput === 'true' && props.uniBackground ? (
        <div className="card blurry">
          <div>
            <h2 className="h2-custom-primary">Next Steps:</h2>
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
                  After clicking the "Register" button, you will join the active
                  mentor pool. Mentees will then be able to request you as their
                  mentor after you have been suggested as a fitting mentor.
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
                    Your Mentee:{' '}
                  </strong>{' '}
                  After a mentee's request, you will have one week to accept the
                  request to start your mentorship journey together. You can
                  always set your mentorship to inactive in the future, in case
                  you would like to take a break or discontinue mentoring.
                </span>

                <div
                  className="bg-accent-content border-t-4 border-accent rounded-b text-default px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1">
                      <svg
                        className="fill-current h-6 w-6 text-accent mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm">
                        The safety of our mentees is incredibly important. Every
                        mentor has to strictly adhere to our safeguarding
                        guidelines, which you will receive before the start of
                        your first mentorship session.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex gap-x-3">
                <div>
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
                      Maximum Capacity:{' '}
                    </strong>{' '}
                    We expect mentors to commit around 1-2 hours per month per
                    mentee. You can change this number any time.
                  </span>

                  <label
                    htmlFor="maximumCapacityInput"
                    className="label-custom-primary"
                  >
                    Indicate the maximum number of mentees you would like to
                    mentor at the same time:
                    <span id="required">*</span>
                  </label>
                  <div className="mt-2">
                    <div className="input-text-frame-custom-primary max-w-sm">
                      <input
                        name="maximumCapacityInput"
                        required
                        type="number"
                        placeholder="3"
                        defaultValue={
                          props.userdata.maxCapacity
                            ? props.userdata.maxCapacity
                            : 1
                        }
                        min={1}
                        onChange={(event) =>
                          setMaxCapacityInput(Number(event.currentTarget.value))
                        }
                        className="input-text-custom-primary max-w-sm"
                      />
                    </div>
                  </div>
                </div>
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
                  You will also be supported through additional initiatives from
                  our internal team - stay tuned!
                </span>
              </li>
            </ul>

            <UpdateRolesButtonComponent
              userdata={currentUser}
              roleFromDatabase={Number(props.role.id)}
              buttonText="Submit your matchinginfo"
              // should be available only when other info has been submitted
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </form>
  );
}
