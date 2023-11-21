import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Mentorship Platform',
  description: 'Mentors helping Mentees',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props) {
  // 1. Checking if the sessionToken cookie exists
  // const headersList = headers();

  /*
   const sessionTokenCookie = cookies().get('sessionToken');
 const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value)); */

  return (
    <html lang="en" className="h-screen">
      <body className="h-full flex flex-col">{props.children}</body>
    </html>
  );
}
