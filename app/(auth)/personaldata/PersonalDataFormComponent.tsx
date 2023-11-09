'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pronountypes } from '../../../database/pronouns';
import { Country } from '../../../migrations/00000-createTableCountries';
import { UserAll } from '../../../migrations/00004-createTableUsers';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';
import LabelAndSelectComponent from '../../components/LabelandSelectInput';
import UploadImageComponent from '../../components/UploadImageComponent';

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
  const [imageInfo, setImageInfo] = useState([]);

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
        photo: profilePictureInput,
      }),
    });
    router.refresh();
  }

  useEffect(() => {
    async function getImageInfo() {
      const response = await imageInfo;
      // @ts-expect-error secure_url type never
      const responseUrl = response.secure_url;
      setProfilePictureInput(responseUrl);
    }
    getImageInfo().catch((error) => {
      console.log(error);
    });
  }, [imageInfo]);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handlePutPersonalData();
        await router.refresh();
      }}
      className="space-y-12 border-b border-gray-900/10 pb-12"
    >
      <h2 className="h2-custom-primary">Profile</h2>
      <div className="col-span-full">
        <div className="mt-2 flex items-center gap-x-3">
          <label
            htmlFor="photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload a profile photo:
          </label>
          {profilePictureInput ? (
            <img
              src={profilePictureInput}
              alt=""
              className="h-12 w-12 text-gray-300"
            />
          ) : (
            <svg
              className="h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <UploadImageComponent setImageInfo={setImageInfo} />
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <LabelAndInputComponent
          colSpan="4"
          inputName="firstnameInput"
          labeltext="Your first name:"
          required={true}
          type="text"
          placeholder="Jane"
          onChangeFunction={setFirstnameInput}
        />
        <LabelAndInputComponent
          colSpan="3"
          inputName="lastnameInput"
          labeltext="Your last name:"
          required={true}
          type="text"
          placeholder="Doe"
          onChangeFunction={setLastnameInput}
        />
        <LabelAndInputComponent
          colSpan="3"
          inputName="phoneNumber"
          labeltext="Your phone number"
          required={true}
          type="tel"
          placeholder="+43 664 5829837"
          onChangeFunction={setPhoneNumberInput}
        />
        <LabelAndSelectComponent
          colSpan="3"
          inputName="pronounsInput"
          labeltext="Your pronouns:"
          required={true}
          onChangeFunction={setPronounsInput}
          optionlist={pronountypes}
        >
          <option key="dataID-default-select" value="default-select">
            --Choose pronouns--
          </option>
          {pronountypes.map((d) => {
            return (
              <option key={`dataID-select-${d.name}`} value={d.name}>
                {d.name}
              </option>
            );
          })}
        </LabelAndSelectComponent>
        <LabelAndInputComponent
          colSpan="3"
          inputName="birthdateInput"
          labeltext="Your birthdate"
          required={true}
          type="date"
          placeholder="Doe"
          onChangeFunction={setBirthdateInput}
        />

        <LabelAndSelectComponent
          colSpan="3"
          inputName="countryOriginInput"
          labeltext="Your country of origin:"
          required={true}
          onChangeFunction={setOriginCountryInput}
        >
          <option key="dataID-default-select" value="default-select">
            --Choose country--
          </option>
          {countries.map((d) => {
            return (
              <option key={`dataID-select-${d.id}`} value={d.id}>
                {d.name}
              </option>
            );
          })}
        </LabelAndSelectComponent>

        <button id="submitPersonalDetails" className="btn-custom-primary">
          Submit my details
        </button>
        {errors ? 'there was an error' : ''}
      </div>
    </form>
  );
}
