'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { pronountypes } from '../../../database/pronouns';
import { Country } from '../../../migrations/00000-createTableCountries';
import { UserAll } from '../../../migrations/00004-createTableUsers';

type Props = { countries: Country[]; userdata: UserAll };

export default function PersonalDataFormComponent(props: Props) {
  const countries = props.countries;
  const [firstnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  const [pronounsInput, setPronounsInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [birthdateInput, setBirthdateInput] = useState('');
  const [originCountryInput, setOriginCountryInput] = useState('');
  const [profilePictureInput, setProfilePictureInput] = useState('');

  const [errors, setErrors] = useState('');
  const router = useRouter();

  async function handlePutPersonalData() {
    const currentUserID = await Number(props.userdata.id);

    await fetch('/../../api/users/personaldata', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(currentUserID),
        firstname: firstnameInput,
        lastname: lastnameInput,
        pronouns: pronounsInput,
        phone_number: phoneNumberInput,
        birthdate: birthdateInput,
        country_id: originCountryInput,
      }),
    });
    router.refresh();
  }

  return (
    <div id="usersSection" className="card blurry">
      <h2 className="text-2xl">Personal Data Section</h2>
      <p className="text-md">Please enter your personal data here</p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handlePutPersonalData();
        }}
      >
        <div className="form-control">
          <label className="label" htmlFor="firstname">
            <span className="label-text">
              Your first name:<span id="required">*</span>
            </span>
          </label>
          <label className="input-group">
            <span>First name</span>
            <input
              name="firstname"
              placeholder="Jane"
              defaultValue={
                props.userdata.firstname ? props.userdata.firstname : ''
              }
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) => setFirstnameInput(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="lastname">
            <span className="label-text">
              Your last name:<span id="required">*</span>
            </span>
          </label>
          <label className="input-group">
            <span>Last name</span>
            <input
              name="lastname"
              placeholder="Doe"
              defaultValue={
                props.userdata.lastname ? props.userdata.lastname : ''
              }
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) => setLastnameInput(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="pronouns">
            <span className="label-text">
              Your pronouns:<span id="required">*</span>{' '}
            </span>
          </label>
          <label className="input-group">
            <span>Pronouns</span>
            <select
              className="select select-bordered  w-full max-w-xs"
              name="selectPronouns"
              required
              placeholder="--Choose pronouns--"
              defaultValue={
                props.userdata.pronouns ? props.userdata.pronouns : ''
              }
              onChange={(event) => setPronounsInput(event.currentTarget.value)}
            >
              {pronountypes.map((d) => {
                return (
                  <option key={`dataID-select-${d.name}`} value={d.name}>
                    {d.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="phoneNumber">
            <span className="label-text">
              Your phone number (incl. country code):
              <span id="required">*</span>{' '}
            </span>
          </label>
          <label className="input-group">
            <span>Phone Number</span>
            <input
              type="tel"
              name="phoneNumber"
              defaultValue={
                props.userdata.phoneNumber ? props.userdata.phoneNumber : ''
              }
              placeholder="+43 676 1929482"
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) =>
                setPhoneNumberInput(event.currentTarget.value)
              }
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="birthDate">
            <span className="label-text">
              Your birthdate:<span id="required">*</span>{' '}
            </span>
          </label>
          <label className="input-group">
            <span>Birthdate</span>
            <input
              type="date"
              name="birthDate"
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) => setBirthdateInput(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="countryOrigin">
            <span className="label-text">
              Your country of origin:<span id="required">*</span>
            </span>
          </label>
          <label className="input-group">
            <span>Origin Country</span>
            <select
              className="select select-bordered  w-full max-w-xs"
              name="countryOrigin"
              required
              defaultValue="--Choose country of origin--"
              onChange={(event) =>
                setOriginCountryInput(event.currentTarget.value)
              }
            >
              <option
                key="dataID-default-select"
                value="--Choose origin country--"
                disabled
                selected
              >
                --Choose origin country--
              </option>
              {countries.map((d) => {
                return (
                  <option key={`dataID-select-${d.id}`} value={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="profilePhoto">
            <span className="label-text">
              Upload a profile photo:<span id="required">*</span>
            </span>
          </label>
          <label className="input-group">
            <span>Profile Photo</span>
            <input
              name="profilePhoto"
              type="file"
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) =>
                setProfilePictureInput(event.currentTarget.value)
              }
            />
          </label>
        </div>

        <button id="submitPersonalDetails" className="btn max-w-xs		">
          Submit my details
        </button>
        {errors ? 'there was an error' : ''}
      </form>
    </div>
  );
}
