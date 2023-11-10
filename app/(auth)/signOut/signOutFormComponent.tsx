import React from 'react';
import { signOut } from './signOutActions';

export type Props = {
  buttonText: string;
};

export default function SignOutButton(props: Props) {
  return (
    <form>
      <button className="btn-custom-primary" formAction={signOut}>
        {props.buttonText}
      </button>
    </form>
  );
}
