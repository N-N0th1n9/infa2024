import { IFormFields } from '../types/formFields'

const initialTeamInputFields: IFormFields[] = [
  {
    name: 'role',
    type: 'select',
    label: 'Role*',
    options: ['Frontend-team', 'Backend-team', 'Manager-team', 'Designer-team'],
  },
  {
    name: 'teamlead_id',
    type: 'select',
    label: 'TeamLead ID*',
    options: [],
  },
  {
    name: 'project_id',
    type: 'select',
    label: 'Project ID*',
    options: [],
  },
]

export default initialTeamInputFields
