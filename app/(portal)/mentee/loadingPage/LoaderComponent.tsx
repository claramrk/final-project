'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoaderComponent() {
  const [stopLoader, setStopLoader] = useState('run');
  const router = useRouter();

  const reroute: any = '/mentee/matchingoverview';

  setTimeout(() => {
    console.log(stopLoader);
    setStopLoader('stop');
    router.push(reroute);
  }, 4000);

  return (
    <div>
      {stopLoader === 'run' ? (
        <div>
          <p className="p-custom-primary">
            <span className="loading loading-spinner loading-lg" />
            Hold on while we are finding the best mentor matches for you
          </p>
        </div>
      ) : (
        ' '
      )}
    </div>
  );
}
