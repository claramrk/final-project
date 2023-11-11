'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Role } from '../../../migrations/00006-createTableRoles';
import { getRedirectPage, navigation } from '../../../util/pageNavigation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import LabelAndInputComponent from '../../components/LabelAndInputComponent';

type Props = { roles: Role[] };
// type Props = { returnTo?: string | string[] };

export default function SignInFormComponent(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string | number }[]>([]);
  const router = useRouter();
  const pageIndex = navigation;

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
      console.log('error');
    }

    const reroute: any = currentUserRole
      ? getRedirectPage(currentUserRole)
      : `/signIn`;

    router.push(reroute);
    // should be dependent on role whether i get redirected to profile page, or mentors, etc

    router.refresh();
  }

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
        <Link className="link-custom-primary" href="/#">
          Forgot password?
        </Link>
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
