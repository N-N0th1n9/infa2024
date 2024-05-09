interface INavElement {
  path: string
  label: string
  isActive: boolean
}

export const navList: INavElement[] = [
  {
    path: '/projects',
    label: 'Projects',
    isActive: false,
  },
  {
    path: '/clients',
    label: 'Clients',
    isActive: false,
  },
  {
    path: '/employees',
    label: 'Employee',
    isActive: false,
  },
  {
    path: '/tasks',
    label: 'Tasks',
    isActive: false,
  },
  {
    path: '/teams',
    label: 'Teams',
    isActive: false,
  },
]
