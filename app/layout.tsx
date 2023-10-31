import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
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
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header>
          <Navigation />
        </header>
        <div id="main" className="container mx-auto">
          {props.children}
        </div>
        <div className="static bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
