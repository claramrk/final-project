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
      id="exampleRequestedMatch"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleEndMatch();
        router.refresh();
      }}
    >
      <button
        type="button"
        className="btn-custom-primary"
        onClick={() => setEndMentoring(true)}
      >
        {props.buttonText}{' '}
      </button>
      {endMentoring ? (
        <>
          <label htmlFor="responseMentor">
            Please briefly explain why the mentorship has ended:
            <span id="required">*</span>
          </label>
          <textarea
            id="responseMentor"
            className="textarea-custom-primary"
            onChange={(event) =>
              setTerminationResponse(event.currentTarget.value)
            }
          />
          <button className="btn-custom-primary">
            confirm mentorship termination
          </button>
        </>
      ) : (
        ''
      )}
    </form>
  );
}
