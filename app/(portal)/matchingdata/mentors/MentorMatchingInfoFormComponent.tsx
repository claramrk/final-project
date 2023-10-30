'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserAll } from '../../../../migrations/00004-createTableUsers';

type Props = {
  userdata: UserAll;
};

export default function MentorMatchingInfoFormComponent(props: Props) {
  const [maxCapacityInput, setMaxCapacityInput] = useState(1);

  const currentUser = props.userdata;

  const router = useRouter();

  async function handlePutMentorMatchingInfo() {
    const currentUserID = await Number(props.userdata.id);

    await fetch('/../../../api/matchingdata/mentorMatchingInfo', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(currentUserID),
        maxCapacity: Number(maxCapacityInput),
      }),
    });
    await router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handlePutMentorMatchingInfo();
      }}
    >
      <h3>Maximum Capacity</h3>
      <p>We expect mentors to commit around 1-2 hours per month per mentee.</p>
      <label htmlFor="maximum_capacity">
        Please indicate the maximum number of mentees you would like to mentor
        at the same time. You can change this number any time:
      </label>
      <input
        id="maximum_capacity"
        type="number"
        min="1"
        defaultValue={1}
        onChange={(event) =>
          setMaxCapacityInput(Number(event.currentTarget.value))
        }
      />
      <p>Current indicated capacity: {currentUser.maxCapacity}</p>
      <h3>Safeguarding</h3>
      <p>
        The safety of our mentees is incredibly important to us. Therefore,
        every mentor has to strictly adhere to our safeguarding guidelines.
      </p>
      <a
        // check how to download a pdf

        href="/#"
      >
        Safeguarding Contract Download
      </a>
      <label htmlFor="safeguarding_upload">
        Please download the safeguarding contract, read it carefully and upload
        a signed version here:
      </label>
      <input
        id="safeguarding_upload"
        // check how to upload a pdf
      />
      <button type="submit" id="submitAllUniInformation">
        Submit matching Information
      </button>
    </form>
  );
}
