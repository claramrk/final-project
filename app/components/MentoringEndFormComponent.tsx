'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Match } from '../../migrations/00015-createTableMatches';

type Props = {
  match: Match;
  buttonText: string;
};

export default function MentoringEndFormComponent(props: Props) {
  const [endMentoring, setEndMentoring] = useState(false);
  const [terminationResponse, setTerminationResponse] =
    useState('no response given');

  const router = useRouter();

  async function handleEndMatch() {
    await fetch('/../../../api/matches/endMatch', {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(props.match.id),
        terminationResponse: terminationResponse,
        statusInternal: 'mentorship ended',
      }),
    });
    router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleEndMatch();
        router.refresh();
      }}
    >
      <div className="">
        {endMentoring ? (
          <div className="card sub-blurry">
            <label htmlFor="responseMentor" className="label-custom-primary">
              Please explain briefly why the mentorship has ended:
              <span id="required">*</span>
            </label>
            <textarea
              name="responseMentor"
              className="textarea-custom-primary"
              onChange={(event) =>
                setTerminationResponse(event.currentTarget.value)
              }
            />
            <div className="flex items-center  gap-x-2 justify-end">
              <button
                type="button"
                className="btn-custom-primary"
                onClick={() => setEndMentoring(false)}
              >
                Cancel
              </button>
              <button className="btn-custom-primary">Confirm</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              type="button"
              className="btn-custom-third"
              onClick={() => setEndMentoring(true)}
            >
              {props.buttonText}{' '}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
