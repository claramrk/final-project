'use client';

import { useState } from 'react';

export default function RequestMentorTableComponent(props) {
  const [mentorSelection, setMentorSelection] = useState(0);
  const mentorFirstName = props.mentorUserDataWithUniInfoObjectROWFirstName;
  const mentorId = props.mentorUserDataWithUniInfoObjectROWId;
  console.log(mentorSelection);
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          className="radio"
          type="radio"
          id={`mentor-${mentorId}`}
          name="requestMentor"
          value={mentorId}
          onChange={(event) => setMentorSelection(event.currentTarget.value)}
        />
      </label>
    </div>
  );
}
