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
      id="exampleRequestedMatch"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleUpdateMatch();
        router.refresh();
      }}
    >
      {acceptRequest ? (
        <div>
          <label htmlFor="reasonRejection">
            {acceptRequest === 'mentor accepted match'
              ? 'Please write a short message to your mentee:'
              : 'Please briefly indicate the reason for your acceptance or rejection:'}
            <span id="required">*</span>
          </label>
          <div className="chat chat-start">
            <div className="chat-bubble bg-gray-200">
              <textarea
                id="reasonRejection"
                className="bg-transparent border-transparent hover:border-transparent leading-6 text-gray-600 text-justify mt-1"
                onChange={(event) =>
                  setResponseInput(event.currentTarget.value)
                }
              />
            </div>
          </div>
          {/*           <button className="btn-custom-primary">Submit response</button>
           */}{' '}
        </div>
      ) : (
        ''
      )}
      <button
        type="button"
        className={`btn-custom-primary ${
          acceptRequest === 'mentor accepted match'
            ? 'border-2	border-neutral	'
            : '	'
        }`}
        onClick={() => setAcceptRequest('mentor accepted match')}
      >
        Accept match request
      </button>
      <button
        type="button"
        className={`btn-custom-primary ${
          acceptRequest === 'mentor rejected match'
            ? 'border-2	border-neutral'
            : '	'
        }`}
        onClick={() => setAcceptRequest('mentor rejected match')}
      >
        Reject match request
      </button>
      {acceptRequest ? (
        <button className="btn-custom-primary bg-neutral">
          Submit response
        </button>
      ) : (
        ''
      )}
    </form>
  );
}
