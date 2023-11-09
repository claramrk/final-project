'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../migrations/00003-createTableRoles';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';

// type Props = { returnTo?: string | string[] };
type Props = { roles: Role[] };

export default function SignUpForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);

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
      return;
    }
    router.push(`/mentors/dashboard`);

    router.refresh();
  }
  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form
        className="card-body"
        id="signUpForm"
        onSubmit={async (event) => await handleRegister(event)}
      >
        <div className="form-control">
          <legend>
            Sign up as:<span id="required">*</span>
          </legend>
          {filteredRolesMentee.map((d) => {
            return (
              <div key={`dataID-radio-${d.id}`}>
                <input
                  key={`dataID-input-${d.id}`}
                  type="radio"
                  id={`dataID-input-${d.id}`}
                  name="selectRole"
                  value={Number(d.id)}
                  onClick={(event) =>
                    setRole(Number(event.currentTarget.value))
                  }
                />
                <label
                  key={`dataID-label-${d.id}`}
                  htmlFor={`dataID-select-${d.id}`}
                >
                  Mentee - Applying for uni!
                </label>
              </div>
            );
          })}
          {filteredRolesMentor.map((d) => {
            return (
              <div key={`dataID-radio-${d.id}`}>
                <input
                  type="radio"
                  name="selectRole"
                  value={Number(d.id)}
                  onClick={(event) =>
                    setRole(Number(event.currentTarget.value))
                  }
                />

                <label
                  key={`dataID-label-${d.id}`}
                  htmlFor={`dataID-select-${d.id}`}
                >
                  Mentor - Support others!
                </label>
              </div>
            );
          })}

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
          <Link className="link-custom-primary" href="/#">
            Forgot password?
          </Link>
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
