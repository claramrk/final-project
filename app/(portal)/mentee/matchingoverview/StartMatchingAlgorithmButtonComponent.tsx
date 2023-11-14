'use client';

import { StartMatchingAlgorithmServerAction } from './StartMatchingServerAction';

export default function StartMatchingAlgorithmButtonComponent(currentUser) {
  return (
    <button
      formAction={StartMatchingAlgorithmServerAction(currentUser)}
      className="btn-custom-primary"
    >
      {buttonText}
    </button>
  );
}
