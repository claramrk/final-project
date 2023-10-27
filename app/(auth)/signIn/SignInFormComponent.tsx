'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

// type Props = { returnTo?: string | string[] };
type Props = { returnTo?: string | string[] };

export default function SignInFormComponent(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/dashboard/mentors`);
    // should be dependent on role whether i get redirected to profile page, or mentors, etc

    router.refresh();
  }
  return (
    <div id="SignInSection">
      <h2>SignIn </h2>

      <form
        id="signInForm"
        onSubmit={async (event) => await handleSignIn(event)}
      >
        <label htmlFor="emailInput">
          Email:<span id="required">*</span>
        </label>
        <input
          onChange={(event) => setEmail(event.currentTarget.value)}
          id="emailInput"
          required
        />

        <label htmlFor="passwordInput">
          Password:<span id="required">*</span>
        </label>
        <input
          id="passwordInput"
          type="password"
          required
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        {/* <label htmlFor="passwordInput">
          Confirm Password:<span id="required">*</span>
        </label>
  <input id="passwordInput" required />*/}

        <button
          id="signUpButton"
          // Button text changes depending on radio button input
          // creates a new user with role "incomplete mentor" or "incomplete mentee" and redirects to profile input page
        >
          Sign in
        </button>
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
