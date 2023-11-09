'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../../migrations/00003-createTableRoles';
import { UserAll } from '../../../../migrations/00004-createTableUsers';
import LabelAndInputComponent from '../../../components/LabelAndInputComponent';
import UpdateRolesButtonComponent from '../../../components/UpdateRolesButtonComponent';

type Props = {
  userdata: UserAll;
  role: Role | undefined;
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

  const reroute: any = props.role ? `/mentor/matchingoverview` : '/signIn';

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handlePutMentorMatchingInfo();
        await router.push(reroute);
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
      <div id="finalizeRegistrationSection" className="card blurry">
        <p className="p-custom-primary">
          After clicking the "Register" button below our team will review your
          registration. After your registration is approved, you will join the
          active mentor pool. Mentees will then be able to request you as their
          mentor after you have been suggested as a fitting mentor. After a
          mentee's request, you will have one week to accept the request to
          start your mentorship journey together. You can always set your
          mentorship to inactive in the future, in case you would like to take a
          break or discontinue mentoring.
        </p>
        <UpdateRolesButtonComponent
          userdata={currentUser}
          roleAsId={props.role?.id}
          buttonText="Submit your matchinginfo"
          // should be available only when other info has been submitted
        />
      </div>
    </form>
  );
}
