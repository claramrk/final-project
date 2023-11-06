'use client';

import { useState } from 'react';

export default function RequestMentorTableComponent(props) {
  const [mentorSelection, setMentorSelection] = useState(0);
  const [
    topThreeMentorsWithPersonalDataList,
    setTopThreeMentorsWithPersonalDataList,
  ] = useState(props.topThreeMentorsWithPersonalDataList);

  console.log(topThreeMentorsWithPersonalDataList);

  return (
    <>
      {topThreeMentorsWithPersonalDataList.map((d) => {
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
              <div className="font-bold">{d.firstname}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
