'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Match } from '../../../../migrations/00015-createTableMatches';

type Props = {
  match: Match;
};

export default function MentoringEndFormComponent(props: Props) {
  const [endMentoring, setEndMentoring] = useState(false);
  const [mentorResponse, setMentorResponse] = useState('no response given');

  const router = useRouter();

  async function handleEndMatch() {
    await fetch('/../../../api/matches/endMatch', {
      method: 'PUT',
      body: JSON.stringify({
        id: Number(props.match.id),
        responseFromMentor: mentorResponse,
        statusInternal: 'mentorship ended',
      }),
    });
    router.refresh();
  }

  return (
    <form
      id="exampleRequestedMatch"
      className="card sub-blurry"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleEndMatch();
      }}
    >
      Active Match #1: | {props.match.id} Menteename | Mentee contact info |
      Mentee targetunis | Mentee targetsubjects | mentee targetstudylevel |
      Match active since: DATE
      <button
        className="btn-custom-primary"
        onClick={() => setEndMentoring(true)}
      >
        I am no longer mentoring this mentee
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
            onChange={(event) => setMentorResponse(event.currentTarget.value)}
          />
          <button className="btn-custom-primary">
            I am no longer mentoring this mentee
          </button>
        </>
      ) : (
        ''
      )}
    </form>
  );
}
