import EmployeeContainer from '../components/UI/EmployeeContainer'
import MyForm from '../components/UI/MyForm'
import Layout from '../components/containers/Layout'
import { IFormFields } from '../types/formFields'

const fields: IFormFields[] = [
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
  // TODO: Create a selection list for position selection(Senior Frontend, Senior Backend, etc)
  {
    name: 'position',
    type: 'text',
    label: 'Position*',
  },
  // TODO: Create a selection list for team(Of all the teams in the database.)
  {
    name: 'teamId',
    type: 'text',
    label: 'Team ID*',
  },
  {
    name: 'skills',
    type: 'text',
    label: 'Skills',
  },
]

const Employee = () => {
  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5'>
          <EmployeeContainer />
          <EmployeeContainer />
          <EmployeeContainer />
          <EmployeeContainer />
        </div>
      </div>
    </Layout>
  )
}

export default Employee
