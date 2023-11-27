'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pronountypes } from '../../../database/pronouns';
import { Country } from '../../../migrations/00000-createTableCountries';
import { Role } from '../../../migrations/00006-createTableRoles';
import { UserAll } from '../../../migrations/00008-createTableUsers';
import { PersonalDataBodyPost } from '../../api/users/personaldata/route';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';
import LabelAndSelectComponent from '../../components/LabelandSelectInput';
import UpdateRolesButtonComponent from '../../components/UpdateRolesButtonComponent';
import UploadImageComponent from '../../components/UploadImageComponent';

type Props = {
  countries: Country[];
  currentUser: UserAll;
  currentUserRole: Role;
};

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
  const [errors, setErrors] = useState<{ message: string | number }[]>([]);

  const router = useRouter();

  const reroute: any = `/${props.currentUserRole.type}/matchingdata`;

  async function handleUpdateRole() {
    await fetch('/../../../api/users', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(props.currentUser.id),
        roleId: Number(props.currentUserRole.id),
      }),
    });
    router.refresh();
  }

  async function handlePutPersonalData(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const currentUserID = Number(props.currentUser.id);

    const response = await fetch('/../../api/users/personaldata', {
      method: 'PUT',
      body: JSON.stringify({
        userId: Number(currentUserID),
        firstname: firstnameInput,
        lastname: lastnameInput,
        pronouns: pronounsInput,
        phoneNumber: Number(phoneNumberInput),
        birthdate: new Date(birthdateInput),
        countryId: originCountryInput,
        photo: profilePictureInput,
      }),
    });
    const data: PersonalDataBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    await handleUpdateRole();
    router.push(reroute);
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
      onSubmit={async (event) => await handlePutPersonalData(event)}
      className=" space-y-14 "
    >
      <div className=" card blurry">
        <h2 className="h2-custom-primary">Please tell us more about you.</h2>
        <div className=" my-10 grid gap-x-6 gap-y-8 lg:grid-cols-6 sm:auto-cols-auto">
          <div className="lg:col-span-full sm:col-span-1">
            <div className="mt-2 flex items-center gap-x-3">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your profile photo:
              </label>

              <div className="avatar mr-4">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {profilePictureInput ? (
                    <Image
                      src={profilePictureInput}
                      alt=""
                      height="100"
                      width="100"
                    />
                  ) : (
                    <svg
                      className="h-12 w-12 text-gray-300"
                      viewBox="2 2 24 24"
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
                </div>
              </div>

              <div className="btn-custom-primary">
                <UploadImageComponent setImageInfo={setImageInfo} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 sm:col-span-1">
            <LabelAndInputComponent
              inputName="firstnameInput"
              labeltext="Your first name:"
              required={true}
              type="text"
              placeholder="Jane"
              onChangeFunction={setFirstnameInput}
            />
          </div>
          <div className="lg:col-span-2 sm:col-span-1">
            <LabelAndInputComponent
              inputName="lastnameInput"
              labeltext="Your last name:"
              required={true}
              type="text"
              placeholder="Doe"
              onChangeFunction={setLastnameInput}
            />
          </div>
          <div className="lg:col-span-2 sm:col-span-1">
            <LabelAndSelectComponent
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
          </div>
          <div className="lg:col-span-4 sm:col-span-1">
            <LabelAndInputComponent
              inputName="phoneNumber"
              labeltext="Your phone number"
              required={true}
              type="tel"
              placeholder="00436645829837"
              onChangeFunction={setPhoneNumberInput}
            />
          </div>

          <div className="col-span-3">
            <LabelAndInputComponent
              inputName="birthdateInput"
              labeltext="Your birthdate"
              required={true}
              type="date"
              placeholder="Doe"
              onChangeFunction={setBirthdateInput}
            />
          </div>
          <div className="col-span-3">
            <LabelAndSelectComponent
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
          </div>
        </div>
        <div className="flex justify-end	mb-5 mx-5">
          <UpdateRolesButtonComponent
            userdata={props.currentUser}
            roleFromDatabase={Number(props.currentUserRole.id)}
            buttonText={
              'Continue →'
              /*   props.currentUserRole.type === 'mentor'
                  ? `Enter your university background on the next page`
                  : `Enter your target universities and subjects on the next page` */
            }
          />
        </div>
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <div role="alert" className="alert fixed max-w-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error: {error.message}</span>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
