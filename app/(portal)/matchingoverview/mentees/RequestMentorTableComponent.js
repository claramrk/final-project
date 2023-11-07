'use client';

import { useEffect, useState } from 'react';

export default function RequestMentorTableComponent(props) {
  const [mentorSelection, setMentorSelection] = useState(0);
  const [
    topThreeMentorsWithPersonalDataListValue,
    settopThreeMentorsWithPersonalDataListValue,
  ] = useState(props.topThreeMentorsWithPersonalDataList);

  useEffect(() => {
    async function list() {
      const response = await props.topThreeMentorsWithPersonalDataList;
      topThreeMentorsWithPersonalDataListValue(response);
    }
    list().catch((error) => {
      console.log(error);
    });
  }, [
    topThreeMentorsWithPersonalDataListValue,
    props.topThreeMentorsWithPersonalDataList,
  ]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {topThreeMentorsWithPersonalDataListValue
        ? topThreeMentorsWithPersonalDataListValue.map((d) => {
            return (
              <div key={`uniqueID-${d.id}`}>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      className="radio"
                      type="radio"
                      id={`mentor-${d.id}}`}
                      name="requestMentor"
                      value={mentorSelection}
                      onChange={(event) =>
                        setMentorSelection(event.currentTarget.value)
                      }
                    />
                  </label>
                </div>
                <div>
                  <p className="font-bold">{d.firstname}</p>
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
        />
      </div>
      <button className="btn max-w-xs		">Send mentor request</button>
    </form>
  );
}
