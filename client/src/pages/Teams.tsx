import MyForm from '../components/UI/MyForm'
import TeamContainer from '../components/UI/TeamContainer'
import Layout from '../components/containers/Layout'
import { IFormFields } from '../types/formFields'

const fields: IFormFields[] = [
  {
    name: 'role',
    type: 'text',
    label: 'Role*',
  },
  {
    name: 'teamLidId',
    type: 'text',
    label: 'teamLid ID*',
  },
  {
    name: 'projectId',
    type: 'text',
    label: 'Project ID*',
  },
]

const Teams = () => {
  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='flex flex-col gap-5 w-full'>
          <TeamContainer />
          <TeamContainer />
          <TeamContainer />
          <TeamContainer />
        </div>
      </div>
    </Layout>
  )
}

export default Teams
