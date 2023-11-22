import { Role } from '../migrations/00006-createTableRoles';

export const navigation = [
  {
    id: 5,
    pageName: 'Matchingoverview',
    forUserType: ['mentor'],
    permissionFor: ['approved mentor'],
    clickableByUser: true,
    href: '/mentor/matchingoverview',
  },
  {
    id: 4,
    pageName: 'Matchingdata',
    forUserType: ['mentor'],
    permissionFor: ['complete mentor'],
    clickableByUser: true,
    href: '/mentor/matchingdata',
  },
  {
    id: 6,
    pageName: 'Matchingoverview',
    forUserType: ['mentee'],
    permissionFor: ['approved mentee'],
    clickableByUser: true,

    href: '/mentee/matchingoverview',
  },
  {
    id: 3,

    pageName: 'Matchingdata',
    forUserType: ['mentee'],
    permissionFor: ['complete mentee'],
    clickableByUser: true,

    href: '/mentee/matchingdata',
  },
  {
    id: 2,

    pageName: 'Personaldata',
    forUserType: ['mentor', 'mentee', 'admin'],
    clickableByUser: true,

    permissionFor: ['incomplete mentee', 'incomplete mentor', 'admin'],
    href: '/personaldata',
  },
  {
    id: 1,
    pageName: 'Mainpage',
    forUserType: ['mentor', 'mentee', 'admin', 'undefined'],
    clickableByUser: true,

    permissionFor: [],
    href: '/#',
  },
  {
    id: 7,
    pageName: 'Profile',
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
    href: '/not-found',
  },
];

export function getRedirectPage(currentUserRole: Role) {
  const rerouteRoleSubType = currentUserRole.name;

  let reroutePage;
  if (rerouteRoleSubType === 'incomplete mentor') {
    reroutePage = '/personaldata';
  }
  if (rerouteRoleSubType === 'complete mentor') {
    reroutePage = '/mentor/matchingdata';
  }
  if (rerouteRoleSubType === 'approved mentor') {
    reroutePage = '/mentor/matchingoverview';
  }
  if (rerouteRoleSubType === 'incomplete mentee') {
    reroutePage = '/personaldata';
  }
  if (rerouteRoleSubType === 'complete mentee') {
    reroutePage = '/mentee/matchingdata';
  }
  if (rerouteRoleSubType === 'approved mentee') {
    reroutePage = '/mentee/matchingoverview';
  }
  return reroutePage;
}
