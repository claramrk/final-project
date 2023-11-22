'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RequestMentorFormComponent(props) {
  const [mentorSelection, setMentorSelection] = useState(0);
  const [mentorSelectionName, setMentorSelectionName] = useState(
    'your selected mentor',
  );

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
    if (!currentUserID) {
    } else if (!mentorSelection) {
    } else if (!messageToMentor) {
    } else {
      await fetch('/../../api/matches', {
        method: 'POST',
        body: JSON.stringify({
          menteeUserId: currentUserID,
          mentorUserId: mentorSelection,
          messageToMentor: messageToMentor,

          statusInternal: 'mentee requested mentor',
        }),
      });
    }
  }

  return (
    <div className="card sub-blurry">
      <h2 className="h2-custom-primary">Choose your Mentor</h2>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handlePostMentorRequest();
          router.push('/mentee/dashboard');
        }}
      >
        <div className="lg:flex lg:flex-row items-center ">
          <div className="lg:flex lg:flex-row items-center ">
            {topThreeMentorsWithPersonalDataListValue.map((d) => {
              return (
                <div
                  key={`uniqueID-${d.id}`}
                  data-testid={`uniqueID-${topThreeMentorsWithPersonalDataListValue.indexOf(
                    d,
                  )}-radio`}
                  className={`card blurry ${
                    Number(mentorSelection) === Number(d.id)
                      ? 'border-4	border-neutral	'
                      : '	border-4	border-transparent	'
                  }`}
                >
                  <label>
                    <div className="avatar">
                      <div className="lg:w-24 sm:w-5 rounded-xl">
                        <img width="60" height="60" src={d.photo} alt="" />
                      </div>
                    </div>
                    <h3 className="h3-custom-primary">{d.firstname}</h3>

                    <input
                      className="hidden"
                      type="radio"
                      name="requestMentor"
                      value={d.id}
                      onClick={(event) => {
                        setMentorSelection(Number(event.currentTarget.value));
                        setMentorSelectionName(d.firstname);
                      }}
                      required
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className="card sub-blurry">
            <label className="label-custom-primary" htmlFor="mentorMessage">
              Please include a short message to{' '}
              <strong>{mentorSelectionName}</strong>:{' '}
              <span id="required">*</span>{' '}
            </label>
            <textarea
              name="mentorMessage"
              className="textarea textarea-bordered"
              placeholder="Your message ..."
              value={messageToMentor}
              onChange={(event) =>
                setMessageToMentor(event.currentTarget.value)
              }
              required
            />
            <button className="btn-custom-primary">Send mentor request</button>
          </div>
        </div>
      </form>
    </div>
  );
}
