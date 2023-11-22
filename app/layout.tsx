import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Mentorship Platform',
  description: 'Mentors helping Mentees',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        {props.children}{' '}
        <div className=" bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
