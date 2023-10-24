'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

type Props = { returnTo?: string | string[] };

export default function SignUpForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
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

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
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
          Sign up
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
