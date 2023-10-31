import React from 'react';
import { signOut } from './signOutActions';

export default function SignOutButton() {
  return (
    <form>
      <button className="btn" formAction={signOut}>
        Sign out
      </button>
    </form>
  );
}
