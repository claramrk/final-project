'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../../migrations/00006-createTableRoles';
import { UserAll } from '../../../../migrations/00008-createTableUsers';
import LabelAndInputComponent from '../../../components/LabelAndInputComponent';
import UpdateRolesButtonComponent from '../../../components/UpdateRolesButtonComponent';

type Props = {
  userdata: UserAll;
  role: Role;
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

  const reroute: any = `/mentor/matchingoverview`;

  async function handleUpdateRole() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.userdata.id),
        roleId: Number(props.role.id),
      }),
    });
    await router.refresh();
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handlePutMentorMatchingInfo();
        await handleUpdateRole();
        await router.refresh();
        await router.push(reroute);
      }}
    >
      <div className="card blurry">
        <h3 className="h3-custom-primary">Maximum Capacity</h3>
        <p className="p-custom-primary">
          We expect mentors to commit around 1-2 hours per month per mentee. You
          can change this number any time.
        </p>
        <LabelAndInputComponent
          inputName="maximumCapacityInput"
          labeltext="Please indicate the maximum number of mentees you would like to mentor
          at the same time:"
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
      </div>
      <div className="card blurry">
        <h3 className="h3-custom-primary">Safeguarding</h3>
        <p className="p-custom-primary">
          The safety of our mentees is incredibly important to us. Every mentor
          has to strictly adhere to our safeguarding guidelines, which you will
          receive before the start of your first mentorship session.
        </p>
        {/*  <a
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
      /> */}
        <div id="finalizeRegistrationSection">
          <h3 className="h3-custom-primary">Next Steps:</h3>

          <p className="p-custom-primary">
            After clicking the "Register" button below our team will review your
            registration. After your registration is approved, you will join the
            active mentor pool. Mentees will then be able to request you as
            their mentor after you have been suggested as a fitting mentor.
            After a mentee's request, you will have one week to accept the
            request to start your mentorship journey together. You can always
            set your mentorship to inactive in the future, in case you would
            like to take a break or discontinue mentoring.
          </p>
          <UpdateRolesButtonComponent
            userdata={currentUser}
            roleAsId={Number(props.role.id)}
            buttonText="Submit your matchinginfo"
            // should be available only when other info has been submitted
          />
        </div>
      </div>
    </form>
  );
}
