'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserAll } from '../../../../migrations/00004-createTableUsers';
import LabelAndInputComponent from '../../../components/LabelAndInputComponent';

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
      <LabelAndInputComponent
        inputName="maximumCapacityInput"
        labeltext="We expect mentors to commit around 1-2 hours per month per mentee.
        Please indicate the maximum number of mentees you would like to mentor
        at the same time. You can change this number any time:"
        required={true}
        type="number"
        placeholder="3"
        defaultValue={
          props.userdata.maxCapacity ? props.userdata.maxCapacity : 1
        }
        min="1"
        onChangeFunction={setMaxCapacityInput}
      />
      {currentUser.maxCapacity && currentUser.maxCapacity > 0 ? (
        <p className="p-custom-primary">
          Current indicated capacity: {currentUser.maxCapacity}
        </p>
      ) : (
        ''
      )}{' '}
      <h3 className="h3-custom-primary">Safeguarding</h3>
      <p className="p-custom-primary">
        The safety of our mentees is incredibly important to us. Therefore,
        every mentor has to strictly adhere to our safeguarding guidelines.
      </p>
      <a
        className="link-custom-primary"
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
        type="file"
        className="input input-bordered w-full max-w-xs"
        id="safeguarding_upload"
        // check how to upload a pdf
      />
      <button className="btn-custom-primary" id="submitAllUniInformation">
        Submit matching Information
      </button>
    </form>
  );
}
