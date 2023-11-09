export const navigation = [
  {
    id: 5,

    pageName: 'Matchingoverview',
    forUserType: ['mentor'],
    permissionFor: ['complete mentor', 'approved mentor'],
    clickableByUser: true,

    href: '/mentor/matchingoverview',
  },
  {
    id: 4,
    pageName: 'Matchingdata',
    forUserType: ['mentor'],
    permissionFor: ['incomplete mentor'],
    clickableByUser: true,

    href: '/mentor/matchingdata',
  },
  {
    id: 6,
    pageName: 'Matchingoverview',
    forUserType: ['mentee'],
    permissionFor: ['complete mentee', 'approved mentee'],
    clickableByUser: true,

    href: '/mentee/matchingoverview',
  },
  {
    id: 3,

    pageName: 'Matchingdata',
    forUserType: ['mentee'],
    permissionFor: ['incomplete mentee'],
    clickableByUser: true,

    href: '/mentee/matchingdata',
  },
  {
    id: 2,

    pageName: 'Personaldata',
    forUserType: ['mentor', 'mentee', 'admin'],
    clickableByUser: true,

    permissionFor: [
      'incomplete mentee',
      'incomplete mentor',
      'complete mentee',
      'complete mentor',
      'approved mentee',
      'approved mentor',
      'admin',
    ],
    href: '/personaldata',
  },
  {
    id: 1,
    pageName: 'Mainpage',
    forUserType: ['mentor', 'mentee', 'admin', 'undefined'],
    clickableByUser: true,

    permissionFor: [
      'incomplete mentee',
      'incomplete mentor',
      'complete mentee',
      'complete mentor',
      'approved mentee',
      'approved mentor',
      'admin',
      undefined,
    ],
    href: '/#',
  },
];

export function getNavigationPermissions(
  userRoleName: string,
  pageHref: string,
) {
  const currentPage = navigation.find((element) => pageHref === element.href);
  const permissionCheck = currentPage?.permissionFor.includes(userRoleName);
  return permissionCheck;
}
