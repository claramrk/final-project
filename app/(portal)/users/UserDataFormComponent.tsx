'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { pronountypes } from '../../../database/pronouns';
import { Country } from '../../../migrations/00000-createTableCountries';
import { UserAll } from '../../../migrations/00004-createTableUsers';

type Props = { countries: Country[]; userdata: UserAll };
export type UserResponseBodyPut =
  | { user: UserAll }
  | {
      error: string;
    };

type UserResponseBodyGet =
  | { user: UserAll }
  | {
      error: string;
    };
export default function UsersFormComponent(props: Props) {
  const countries = props.countries;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [errors, setErrors] = useState('');
  const router = useRouter();

  async function getUserInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = props.userdata;

    // this sends the api the data
    const response = await fetch(`/../../api/users/${user.id}`, {
      method: 'GET',
    });

    const data: UserResponseBodyGet = await response.json();

    if ('error' in data) {
      setErrors(data.error);
      return;
    }

    router.push(`/#`);
    // should be dependent on role whether i get redirected to profile page, or mentors, etc

    router.refresh();
  }

  return (
    <div id="usersSection" className="card blurry">
      <h2 className="text-2xl">Personal Data Section</h2>
      <p className="text-md">Please enter your personal data here</p>
      <form>
        <div className="form-control">
          <label className="label" htmlFor="firstName">
            <span className="label-text">
              Your first name:<span id="required">*</span>
            </span>
          </label>
          <label className="input-group">
            <span>First name</span>
            <input
              type="text"
              name="firstName"
              placeholder="Jane"
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="lastName">
            <span className="label-text">
              Your last name:<span id="required">*</span>
            </span>
          </label>
          <label className="input-group">
            <span>Last name</span>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) => setLastName(event.currentTarget.value)}
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
              onChange={(event) => setPronouns(event.currentTarget.value)}
            >
              <option
                key="dataID-default-select"
                value="default-select"
                disabled
                selected
              >
                --Choose pronouns--
              </option>
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
              placeholder="+43 676 1929482"
              className="input input-bordered w-full max-w-xs"
              required
              onChange={(event) => setPhoneNumber(event.currentTarget.value)}
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
              onChange={(event) => setBirthdate(event.currentTarget.value)}
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
              placeholder="--Choose country of origin--"
              onChange={(event) => setOriginCountry(event.currentTarget.value)}
            >
              <option
                key="dataID-default-select"
                value="default-select"
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
              onChange={(event) => setProfilePicture(event.currentTarget.value)}
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
