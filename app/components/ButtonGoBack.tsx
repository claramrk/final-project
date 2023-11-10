'use client';

import { useRouter } from 'next/navigation';

export default function ButtonGoBack() {
  const router = useRouter()

  return (
            <button
              className="btn-custom-primary"
              onClick={() => router.back()}
            >
              Go back
            </button>
  )
}
