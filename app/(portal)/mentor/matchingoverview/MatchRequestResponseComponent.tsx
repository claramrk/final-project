'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Match } from '../../../../migrations/00015-createTableMatches';

type Props = {
  match: Match;
};

export default function MatchRequestResponseComponent(props: Props) {
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
        requestExpiry: null,
      }),
    });
    router.refresh();
  }

  return (
    <form
      key={`mentor-${props.match.id}`}
      id="exampleRequestedMatch"
      className="card sub-blurry"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleUpdateMatch();
        router.refresh();
      }}
    >
      Match Request#1: Menteephoto | {props.match.menteeUserId} | Mentee
      targetunis | Mentee targetsubjects | mentee targetstudylevel | Message
      from mentee | Date of request: DATE aniu {props.match.menteeUserId}
      <button
        className="btn-custom-primary"
        onClick={() => setAcceptRequest('mentor accepted match')}
      >
        Accept match request
      </button>
      <button
        className="btn-custom-primary"
        onClick={() => setAcceptRequest('mentor rejected match')}
      >
        Reject match request
      </button>
      {acceptRequest ? (
        <>
          <label htmlFor="reasonRejection">
            {acceptRequest === 'mentor accepted match'
              ? 'Please write a short message to your mentee:'
              : 'Please briefly indicate the reason for your acceptance or rejection:'}
            <span id="required">*</span>
          </label>
          <textarea
            id="reasonRejection"
            className="textarea-custom-primary"
            onChange={(event) => setResponseInput(event.currentTarget.value)}
          />
          <button className="btn-custom-primary">Submit response</button>
        </>
      ) : (
        ''
      )}
    </form>
  );
}
