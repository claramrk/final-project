'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RequestMentorFormComponent(props) {
  const [mentorSelection, setMentorSelection] = useState(0);
  const [
    topThreeMentorsWithPersonalDataListValue,
    setTopThreeMentorsWithPersonalDataListValue,
  ] = useState(props.topThreeMentorsWithPersonalDataList);
  const [messageToMentor, setMessageToMentor] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function list() {
      const response = await props.topThreeMentorsWithPersonalDataList;
      setTopThreeMentorsWithPersonalDataListValue(response);
    }
    list().catch((error) => {
      console.log(error);
    });
  }, [
    topThreeMentorsWithPersonalDataListValue,
    props.topThreeMentorsWithPersonalDataList,
  ]);

  async function handlePostMentorRequest() {
    const currentUserID = Number(props.currentUser.id);

    await fetch('/../../api/matches/matchRequest', {
      method: 'POST',
      body: JSON.stringify({
        menteeUserId: currentUserID,
        mentorUserId: mentorSelection,
        messageToMentor: messageToMentor,
        statusInternal: 'Mentor requested - waiting for response',
      }),
    });
    router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handlePostMentorRequest();
      }}
    >
      {topThreeMentorsWithPersonalDataListValue
        ? topThreeMentorsWithPersonalDataListValue.map((d) => {
            return (
              <div key={`uniqueID-${d.id}`}>
                <div className="form-control">
                  <label
                    className="label cursor-pointer"
                    htmlFor="requestMentor"
                  >
                    {' '}
                    {d.firstname}
                  </label>

                  <input
                    className="radio"
                    type="radio"
                    name="requestMentor"
                    value={mentorSelection}
                    onChange={() => setMentorSelection(d.id)}
                  />
                </div>
              </div>
            );
          })
        : ''}
      <div className="card sub-blurry">
        <label htmlFor="mentorMessage">
          Please write a short message what to your selected mentor. Write
          about: <span id="required">*</span>{' '}
        </label>

        <ul className="list-inside	list-disc	">
          <li>where you need the most help with</li>
          <li>where you are currently at </li>
          <li>why you would like them to become your mentor:</li>
        </ul>
        <textarea
          id="mentorMessage"
          className="textarea textarea-bordered"
          placeholder="Your message ..."
          value={messageToMentor}
          onChange={(event) => setMessageToMentor(event.currentTarget.value)}
        />
      </div>
      <button className="btn-custom-primary">Send mentor request</button>
    </form>
  );
}
