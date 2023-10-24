import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import Navigation from '../util/Navigation';
import SignOutButton from './(auth)/signOut/signOutFormComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentorship Platform',
  description: 'Mentors helping Mentees',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <img
            src="https://images.squarespace-cdn.com/content/5a1abda8aeb6251ef0a76deb/1585339723404-IGGZ5G14107C6804B7HJ/logo_header.png?content-type=image%2Fpng"
            alt="logo"
            height="40"
          />
          <Navigation />
          <div>
            {user ? (
              <>
                <div>{user.email}</div>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link href="/signUp">Register</Link>
                <Link href="/signIn">Login</Link>
              </>
            )}
          </div>
          <hr />
        </header>
        {props.children}
        <footer>
          <hr />
          <p>Impressum</p>
        </footer>
      </body>
    </html>
  );
}
