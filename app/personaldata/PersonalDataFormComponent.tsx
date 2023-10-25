'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { pronountypes } from '../../database/pronouns';
import { Country } from '../../migrations/00000-createTableCountries';
import { PersonalDataResponseBodyPost } from '../api/(auth)/personaldata/route';

type Props = { countries: Country[] };

export default function PersonalDataFormComponent(props: Props) {
  const countries = props.countries;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [originCountry, setOriginCountry] = useState('');

  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/personaldata', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        pronouns,
        phoneNumber,
        birthdate,
        originCountry
      }),
    });

    const data: PersonalDataResponseBodyPost = await response.json();


    if ('errors' in data) {
      setErrors(data.errors);
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
      <form>
        <label htmlFor="firstName">
          Your first name:<span id="required">*</span>
        </label>
        <input id="firstName" required />
        <label htmlFor="lastName">
          Your last name:<span id="required">*</span>
        </label>
        <input id="lastName" required />
        <label htmlFor="pronouns">
          Your pronouns:<span id="required">*</span>
        </label>
        <select id="selectPronouns" name="selectPronouns" required>
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
        <input id="phoneNumber" type="tel" required />
        <label htmlFor="birthDate">
          Your birthdate:<span id="required">*</span>
        </label>
        <input id="birthDate" required type="date" />
        <label htmlFor="countryOrigin">
          Your country of origin:<span id="required">*</span>
        </label>
        <select id="selectOriginCountry" name="selectOriginCountry" required>
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
      </form>
    </div>
  );
}
