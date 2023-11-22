'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../migrations/00006-createTableRoles';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';

type Props = { roles: Role[] };

export default function SignUpForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(10);
  const [errors, setErrors] = useState<{ message: string | number }[]>([]);
  const router = useRouter();

  const roles = props.roles;
  const filteredRolesMentee = roles.filter(
    (r) => r.name === 'incomplete mentee',
  );
  const filteredRolesMentor = roles.filter(
    (r) => r.name === 'incomplete mentor',
  );

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (role === 1 || role === 4) {
      setErrors([]);
    } else {
      setErrors([{ message: 'select a role!' }]);
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push(`/personaldata`);

    router.refresh();
  }

  return (
    <div>
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form
          className="card-body"
          id="signUpForm"
          onSubmit={async (event) => await handleRegister(event)}
        >
          <div className="form-control ">
            <legend className="label-custom-primary">
              Sign up as:<span id="required">*</span>
            </legend>
            <div className="flex flex-row sm:flex-column">
              {filteredRolesMentee.map((d) => {
                return (
                  <div
                    key={`dataID-radio-${d.id}`}
                    className={`card blurry ${
                      role === d.id
                        ? 'border-4	border-neutral	'
                        : '	border-4	border-transparent	'
                    }`}
                  >
                    <button
                      name="selectRole"
                      value={Number(d.id)}
                      onClick={(event) => {
                        event.preventDefault();
                        setRole(Number(event.currentTarget.value));
                      }}
                    >
                      {' '}
                      <div className="avatar">
                        <div className="lg:w-24 sm:w-sm rounded-xl">
                          <Image
                            alt="image-select-2"
                            width="60"
                            height="60"
                            src="/menteeSignUp.jpg"
                          />
                        </div>
                      </div>
                      <h3 className="h3-custom-primary pt-0">Mentee</h3>
                      <p className="p-custom-primary text-center">
                        Applying
                        <br />
                        for uni!
                      </p>
                    </button>
                  </div>
                );
              })}
              {filteredRolesMentor.map((d) => {
                return (
                  <div
                    key={`dataID-radio-${d.id}`}
                    className={`card blurry  ${
                      role === d.id
                        ? 'border-4	border-neutral	'
                        : '	border-4	border-transparent	'
                    }`}
                  >
                    <button
                      name="selectRole"
                      value={Number(d.id)}
                      onClick={(event) => {
                        event.preventDefault();
                        setRole(Number(event.currentTarget.value));
                      }}
                    >
                      <div className="avatar">
                        <div className="lg:w-24 sm:w-sm rounded-xl">
                          <Image
                            alt="image-select-2"
                            width="60"
                            height="60"
                            src="/mentorSignUp.jpg"
                          />
                        </div>
                      </div>

                      <h3 className="h3-custom-primary pt-0">Mentor</h3>
                      <p className="p-custom-primary text-center">
                        Support others!
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
            <LabelAndInputComponent
              inputName="emailInput"
              labeltext="Your email:"
              required={true}
              type="email"
              placeholder="mail@example.com"
              onChangeFunction={setEmail}
            />
            <LabelAndInputComponent
              inputName="passwordInput"
              labeltext="Your password:"
              required={true}
              type="password"
              placeholder="**********"
              onChangeFunction={setPassword}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" id="signUpButton">
              {' '}
              Sign up
            </button>
          </div>
        </form>
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
  );
}
