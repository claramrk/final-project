'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { pronountypes } from '../../../database/pronouns';
import { Country } from '../../../migrations/00000-createTableCountries';
import { UserAll } from '../../../migrations/00004-createTableUsers';
import { UserResponseBodyPut } from '../../api/users/[userid]/route';

type Props = { countries: Country[]; userdata: UserAll };
export type UserResponseBodyPutNoPassword =
  | { user: UserAll }
  | {
      error: string;
    };

export default function PersonalDataFormComponent(props: Props) {
  const countries = props.countries;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [originCountry, setOriginCountry] = useState('');

  const [errors, setErrors] = useState('');
  const router = useRouter();

  const user = props.userdata;

  async function handlePersonalData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // this sends the api the data
    const response = await fetch(`/../api/users/${props.userdata.id}/`, {
      method: 'PUT',
      body: JSON.stringify({
        id: user.id,
        firstname: firstName,
        lastname: lastName,
        pronouns: pronouns,
        phone_number: phoneNumber,
        birthdate: birthdate,
        country_id: originCountry,
      }),
    });
    console.log(response);

    const data: UserResponseBodyPutNoPassword = await response.json();

    if ('error' in data) {
      setErrors(data.error);
      return;
    }

    router.push(`/dashboard/mentors`);
    // should be dependent on role whether i get redirected to profile page, or mentors, etc

    router.refresh();
  }
  return (
    <div id="personalDataSection">
      <h2>Personal Data Section</h2>
      <p>Please enter your personal data here</p>
      {props.userdata.id}
      <form onSubmit={async (event) => await handlePersonalData(event)}>
        <label htmlFor="firstName">
          Your first name:<span id="required">*</span>
        </label>
        <input
          id="firstName"
          required
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="lastName">
          Your last name:<span id="required">*</span>
        </label>
        <input
          id="lastName"
          required
          onChange={(event) => setLastName(event.currentTarget.value)}
        />

        <label htmlFor="pronouns">
          Your pronouns:<span id="required">*</span>
        </label>
        <select
          id="selectPronouns"
          name="selectPronouns"
          required
          onChange={(event) => setPronouns(event.currentTarget.value)}
        >
          <option key="dataID-default-select" value="default-select">
            --Please choose your pronouns--
          </option>

          {pronountypes.map((d) => {
            return (
              <option key={`dataID-select-${d.name}`} value={d.name}>
                {d.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="phoneNumber">
          Your phone number (incl. country code):<span id="required">*</span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          required
          onChange={(event) => setPhoneNumber(event.currentTarget.value)}
        />

        <label htmlFor="birthDate">
          Your birthdate:<span id="required">*</span>
        </label>
        <input
          id="birthDate"
          required
          type="date"
          onChange={(event) => setBirthdate(event.currentTarget.value)}
        />

        <label htmlFor="countryOrigin">
          Your country of origin:<span id="required">*</span>
        </label>
        <select
          id="selectOriginCountry"
          name="selectOriginCountry"
          required
          onChange={(event) => setOriginCountry(event.currentTarget.value)}
        >
          <option key="dataID-default-select" value="default-select">
            --Please choose your country of origin--
          </option>

          {countries.map((d) => {
            return (
              <option key={`dataID-select-${d.id}`} value={d.id}>
                {d.name}
              </option>
            );
          })}
        </select>
        <button id="submitPersonalDetails">Submit my details</button>
        {errors ? 'there was an error' : ''}
      </form>
    </div>
  );
}
