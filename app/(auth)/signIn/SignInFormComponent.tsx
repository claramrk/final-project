'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';

// type Props = { returnTo?: string | string[] };
// type Props = { returnTo?: string | string[] };

export default function SignInFormComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string | number }[]>([]);
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
    <form id="signInForm" onSubmit={async (event) => await handleSignIn(event)}>
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

      <button className="btn-custom-primary" id="signUpButton">
        Sign in
      </button>
      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
