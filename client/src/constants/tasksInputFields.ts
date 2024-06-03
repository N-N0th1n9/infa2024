import { IFormFields } from '../types/formFields'

const initialTaskInputFields: IFormFields[] = [
  {
    name: 'description',
    type: 'text',
    label: 'Description*',
  },
  {
    name: 'project_id',
    type: 'select',
    label: 'Project ID*',
    options: [],
  },
  {
    name: 'employee_id',
    type: 'select',
    label: 'Employee ID*',
    options: [],
  },
]

export default initialTaskInputFields
