'use client';

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
