'use client';

import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../migrations/00006-createTableRoles';
import { getRedirectPage } from '../../../util/pageNavigation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';

type Props = { roles: Role[] };

export default function SignInFormComponent(props: Props) {
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

    const currentUserRoleId = data.user.roleId;
    const currentUserRole = props.roles.find((r) => r.id === currentUserRoleId);

    if (!currentUserRole) {
      redirect(`../signIn`);
    }

    // reroute dependent on user role

    const reroute: any = getRedirectPage(currentUserRole);
    router.push(reroute);

    router.refresh();
  }

  return (
    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
      <form
        className="card-body"
        id="signInForm"
        onSubmit={async (event) => await handleSignIn(event)}
      >
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

        <div className="form-control mt-6">
          <button className="btn btn-primary" id="signUpButton">
            Sign in
          </button>
        </div>
        {/*  <Link className="link-custom-primary" href="/#">
          Forgot password? <span aria-hidden="true">→</span>
        </Link> */}
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
