'use client';

import { UserAll } from '../../../../migrations/00008-createTableUsers';
import { StartMatchingAlgorithmServerAction } from './StartMatchingServerAction';

export default function StartMatchingAlgorithmButtonComponent(
  currentUser: UserAll,
) {
  return (
    <button
      onClick={StartMatchingAlgorithmServerAction(currentUser)}
      className="btn-custom-primary"
    >
      Hi
    </button>
  );
}
