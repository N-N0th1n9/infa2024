import { IFormFields } from '../types/formFields'

const initialEmployeeInputFields: IFormFields[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name*',
  },
  {
    name: 'surname',
    type: 'text',
    label: 'Surname*',
  },
  {
    name: 'position',
    type: 'select',
    label: 'Position*',
    options: [
      'Frontend-lead',
      'Frontend-senior',
      'Frontend-middle',
      'Frontend-junior',
      'Backend-lead',
      'Backend-senior',
      'Backend-middle',
      'Backend-junior',
      'Manager-senior',
      'Manager',
      'Designer-senior',
      'Designer',
    ],
  },
  {
    name: 'team_id',
    type: 'select',
    label: 'Team ID',
    options: [],
  },
  {
    name: 'skills',
    type: 'text',
    label: 'Skills',
  },
]

export default initialEmployeeInputFields
