'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../migrations/00003-createTableRoles';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

// type Props = { returnTo?: string | string[] };
type Props = { roles: Role[] };

export default function SignUpForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);

  const [errors, setErrors] = useState<{ message: string | number }[]>([]);
  const router = useRouter();

  const roles = props.roles;

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
    router.push(`/dashboard/mentors`);

    router.refresh();
  }
  return (
    <form
      id="signUpForm"
      onSubmit={async (event) => await handleRegister(event)}
    >
      <legend>
        Sign up as:<span id="required">*</span>
      </legend>
      <select
        className="select select-bordered  w-full max-w-xs"
        id="selectRole"
        name="selectRole"
        required
        onChange={(event) => setRole(Number(event.currentTarget.value))}
      >
        <option key="dataID-default-select" value="default-select">
          --Please choose your role--
        </option>

        {roles.map((d) => {
          return (
            <option key={`dataID-select-${d.id}`} value={Number(d.id)}>
              {d.name}
            </option>
          );
        })}
      </select>

      <label htmlFor="emailInput">
        Email:<span id="required">*</span>
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => setEmail(event.currentTarget.value)}
        id="emailInput"
        type="email"
        required
      />

      <label htmlFor="passwordInput">
        Password:<span id="required">*</span>
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        id="passwordInput"
        type="password"
        required
        onChange={(event) => setPassword(event.currentTarget.value)}
      />

      {/* <label htmlFor="passwordInput">
          Confirm Password:<span id="required">*</span>
        </label>
  <input id="passwordInput"
  className="input input-bordered w-full max-w-xs"
  required />*/}

      <button
        className="btn max-w-xs		"
        id="signUpButton"
        // Button text changes depending on radio button input
        // creates a new user with role "incomplete mentor" or "incomplete mentee" and redirects to profile input page
      >
        Sign up
      </button>
      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
