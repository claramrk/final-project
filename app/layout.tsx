import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
  title: 'Mentorship Platform',
  description: 'Mentors helping Mentees',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props) {
  // 1. Checking if the sessionToken cookie exists
  const headersList = headers();

  /*
   const sessionTokenCookie = cookies().get('sessionToken');
 const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value)); */

  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col min-h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          <Navigation />
        </header>
        <div className=" isolate px-6 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#11B196] to-[#3b8cd9] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div id="main" className="container">
                {props.children}
              </div>
            </div>
          </div>
        </div>

        <div className="static bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
