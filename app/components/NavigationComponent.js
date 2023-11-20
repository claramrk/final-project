'use client';
import { useEffect, useState } from 'react';
import { navigation } from '../../util/pageNavigation';

export default function NavigationComponent(props) {
  const [pageIndexUser, setPageIndexUser] = useState(navigation);
  const currentUser = props.currentUser;

  const pageIndexUserTest = pageIndexUser.filter((p) =>
    p.permissionFor.includes(currentUser.userRolesId[0].name),
  );

  const pageIndexUserTestSorted = pageIndexUserTest.sort(function (a, b) {
    return Number(a.id) - Number(b.id);
  });

  useEffect(() => {
    async function runNavigationMap() {
      const pageIndexUserTestMap = await pageIndexUser.filter((p) =>
        p.permissionFor.includes(currentUser.userRolesId[0].name),
      );
      const pageIndexUserTestSortedMap = pageIndexUserTestMap.sort(
        function (a, b) {
          return Number(a.id) - Number(b.id);
        },
      );
      setPageIndexUser(pageIndexUserTestSortedMap);
    }
    runNavigationMap().catch((error) => {
      console.log(error);
    });
  }, [currentUser.userRolesId, pageIndexUser]);

  return (
    <>
      {' '}
      {pageIndexUserTestSorted.map((p) => {
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
