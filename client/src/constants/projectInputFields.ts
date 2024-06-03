import { IFormFields } from '../types/formFields'

const initialProjectInputFields: IFormFields[] = [
  {
    name: 'id',
    value: '',
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name*',
    value: '',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    value: '',
  },
  {
    name: 'date_end',
    type: 'date',
    label: 'Date_end',
    value: '',
  },
  {
    name: 'client_name',
    type: 'text',
    label: 'Client name*',
    value: '',
  },
  {
    name: 'client_surname',
    type: 'text',
    label: 'Client surname*',
    value: '',
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone*',
    value: '',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email*',
    value: '',
  },
  {
    name: 'team_id',
    type: 'select',
    label: 'Team ID*',
    options: [],
    value: '',
  },
]

export default initialProjectInputFields
