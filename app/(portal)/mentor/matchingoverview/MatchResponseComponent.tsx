'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Match } from '../../../../migrations/00015-createTableMatches';

type Props = {
  match: Match;
};

export default function MatchResponseComponent(props: Props) {
  const [acceptRequest, setAcceptRequest] = useState('');
  const [responseInput, setResponseInput] = useState('no reason given');

  const router = useRouter();

  async function handleUpdateMatch() {
    await fetch('/../../../api/matches', {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(props.match.id),
        responseFromMentor: responseInput,
        statusInternal: acceptRequest,
      }),
    });
    router.refresh();
  }

  return (
    <form
      key={`mentor-${props.match.id}`}
      onSubmit={async (event) => {
        event.preventDefault();
        await handleUpdateMatch();
        router.refresh();
      }}
    >
      {acceptRequest ? (
        <>
          <label htmlFor="reasonRejection" className="label-custom-primary">
            {acceptRequest === 'mentor accepted match'
              ? 'Write a short message to your mentee:'
              : 'Indicate the reason for decision:'}
            <span id="required">*</span>
          </label>
          <textarea
            name="reasonRejection"
            className="textarea-custom-primary"
            onChange={(event) => setResponseInput(event.currentTarget.value)}
          />
          <div className="flex items-center  gap-x-2 justify-end">
            <button
              type="button"
              className="btn-custom-primary"
              onClick={() => setAcceptRequest('')}
            >
              Cancel
            </button>
            <button className="btn-custom-primary">Submit response</button>{' '}
          </div>
        </>
      ) : (
        <div className="flex  gap-x-2 justify-end">
          <button
            type="button"
            className="btn-custom-fourth"
            onClick={() => setAcceptRequest('mentor rejected match')}
          >
            Reject match request
          </button>
          <button
            type="button"
            className="btn-custom-third"
            onClick={() => setAcceptRequest('mentor accepted match')}
          >
            Accept match request
          </button>
        </div>
      )}
    </form>
  );
}
