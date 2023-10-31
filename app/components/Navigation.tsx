import { cookies } from 'next/headers';
import Link from 'next/link';
import SignOutButton from '../(auth)/signOut/signOutFormComponent';
import { getUserBySessionToken } from '../../database/users';

export default async function Navigation() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const currentUser =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href={`/users/${Number(currentUser?.id)}`}>Profile Page</a>
            </li>
            <li>
              <a>Dashboard</a>
              <ul className="p-2">
                <li>
                  <a href="/dashboard/mentors">Dashboard Mentor</a>
                </li>
                <li>
                  <a href="/dashboard/mentees">Dashboard Mentee</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Matching Info Input</a>
              <ul className="p-2">
                <li>
                  <a href="/matchingdata/mentors">Matching Data Mentor</a>
                </li>
                <li>
                  <a href="/matchingdata/mentees">Matching Data Mentee</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Matching Overview</a>
              <ul className="p-2">
                <li>
                  <a href="/matchingoverview/mentors">
                    Matching Overview Mentor
                  </a>
                </li>
                <li>
                  <a href="/matchingoverview/mentees">
                    Matching Overview Mentee
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href={`/users/${Number(currentUser?.id)}`}>Profile Page</a>
          </li>
          <li>
            <a>Dashboard</a>
            <ul className="p-2">
              <li>
                <a href="/dashboard/mentors">Dashboard Mentor</a>
              </li>
              <li>
                <a href="/dashboard/mentees">Dashboard Mentee</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Matching Info Input</a>
            <ul className="p-2">
              <li>
                <a href="/matchingdata/mentors">Matching Data Mentor</a>
              </li>
              <li>
                <a href="/matchingdata/mentees">Matching Data Mentee</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Matching Overview</a>
            <ul className="p-2">
              <li>
                <a href="/matchingoverview/mentors">Matching Overview Mentor</a>
              </li>
              <li>
                <a href="/matchingoverview/mentees">Matching Overview Mentee</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <>
            <div>{currentUser.email}</div>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/signUp" className="btn">
              Register
            </Link>
            <Link href="/signIn" className="btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
