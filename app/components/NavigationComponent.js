'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigation } from '../../util/pageNavigation';

/*
type Props = {
  currentUser: {
    id: number;
    email: string;
    passwordHash: string;
    firstname: string | null;
    lastname: string | null;
    pronouns: string | null;
    phoneNumber: string | null;
    birthdate: Date | null;
    countryId: string | null;
    photo: string | null;
    roleId: number | null;
    lastActivity: Date | null;
    lastUpdate: Date | null;
    pauseUntil: Date | null;
    maxCapacity: number | null;
    contractDocUrl: string | null;
    userRolesId: Array<[]> | null;
  };
};
 */
export default function NavigationComponent(props) {
  const [pageIndexUser, setPageIndexUser] = useState(navigation);
  const pageIndex = navigation;
  const currentUser = props.currentUser;
  const pathName = usePathname;

  const pageIndexUserTest = pageIndex.filter((p) =>
    p.permissionFor.includes(currentUser.userRolesId[0].name),
  );

  function NavigationMap() {
    const pageIndexUserCalc = [];
    pageIndex.map((n) => {
      n.permissionFor.includes(currentUser.userRolesId[0].name);
      pageIndexUserCalc.push(n);
      console.log(pageIndexUserCalc);
      return pageIndexUserCalc;
    });

    return pageIndexUserCalc;
  }

  useEffect(() => {
    async function runNavigationMap() {
      setPageIndexUser(NavigationMap());
    }
    runNavigationMap().catch((error) => {
      console.log(error);
    });
  }, [currentUser]);

  console.log(pageIndexUser);

  return (
    <>
      {' '}
      {pageIndexUserTest.map((p) => {
        return (
          <li key={`id-${p.pageName}`}>
            <a className="link-custom-nav" href={p.href}>
              {p.pageName}
            </a>
          </li>
        );
      })}
    </>
  );
}
