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
  const [roleError, setRoleError] = useState('');

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
      return console.log(errors);
    }
    router.push(`/personaldata`);

    router.refresh();
  }

  return (
    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
      <form
        className="card-body"
        id="signUpForm"
        onSubmit={async (event) => {
          event.preventDefault();
          await handleRegister(event);
        }}
      >
        <div className="form-control ">
          <legend className="label-custom-primary">
            Sign up as:<span id="required">*</span>
          </legend>
          <div className="flex flex-row">
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
                  <label>
                    <input
                      className="hidden"
                      type="radio"
                      name="selectRole"
                      value={Number(d.id)}
                      onClick={(event) =>
                        setRole(Number(event.currentTarget.value))
                      }
                      required
                    />{' '}
                    <div className="avatar">
                      <div className="w-24 rounded-xl">
                        <Image
                          alt="image-select-2"
                          width="60"
                          height="60"
                          src="/menteeSignUp.jpg"
                        />
                      </div>
                    </div>
                    <h3 className="h3-custom-primary">Mentee</h3>
                    <p className="p-custom-primary">Applying for uni!</p>
                  </label>
                </div>
              );
            })}
            {filteredRolesMentor.map((d) => {
              return (
                <div
                  key={`dataID-radio-${d.id}`}
                  className={`card blurry ${
                    role === d.id
                      ? 'border-4	border-neutral	'
                      : '	border-4	border-transparent	'
                  }`}
                >
                  <label>
                    <input
                      className="hidden"
                      type="radio"
                      name="selectRole"
                      value={Number(d.id)}
                      onClick={(event) =>
                        setRole(Number(event.currentTarget.value))
                      }
                    />
                    <div className="avatar">
                      <div className="w-24 rounded-xl">
                        <Image
                          alt="image-select-2"
                          width="60"
                          height="60"
                          src="/mentorSignUp.jpg"
                        />
                      </div>
                    </div>

                    <h3 className="h3-custom-primary">Mentor</h3>
                    <p className="p-custom-primary">Support others!</p>
                  </label>
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
  );
}
