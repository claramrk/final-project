export const navigation = [
  {
    pageName: 'Matchingoverview',
    forUserType: ['mentor'],
    permissionFor: ['complete mentor', 'approved mentor'],
    clickableByUser: true,

    href: '/mentors/matchingoverview',
  },
  {
    pageName: 'Matchingdata',
    forUserType: ['mentor'],
    permissionFor: ['incomplete mentor'],
    clickableByUser: true,

    href: '/mentors/matchingdata',
  },
  {
    pageName: 'Matchingoverview',
    forUserType: ['mentee'],
    permissionFor: ['complete mentee', 'approved mentee'],
    clickableByUser: true,

    href: '/mentees/matchingoverview',
  },
  {
    pageName: 'Matchingdata',
    forUserType: ['mentee'],
    permissionFor: ['incomplete mentee'],
    clickableByUser: true,

    href: '/mentees/matchingoverview',
  },
  {
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
