import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from './util/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentorship Platform',
  description: 'Mentors helping Mentees',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <hr />
        </header>
        {children}
        <footer>
          <hr />
          <p>Impressum</p>
        </footer>
      </body>
    </html>
  );
}
