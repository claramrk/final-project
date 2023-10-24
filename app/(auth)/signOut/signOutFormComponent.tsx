import React from 'react';
import { signOut } from './signOutActions';

export default function SignOutButton() {
  return (
    <form>
      <button formAction={signOut}>Logout </button>
    </form>
  );
}
