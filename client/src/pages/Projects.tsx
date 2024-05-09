import MyForm from '../components/UI/MyForm'
import ProjectContainer from '../components/UI/ProjectContainer'
import Layout from '../components/containers/Layout'
import { IFormFields } from '../types/formFields'

const fields: IFormFields[] = [
  {
    name: 'clientId',
    type: 'text',
    label: 'Client ID* (or create new)',
  },
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
    name: 'description',
    type: 'text',
    label: 'Description',
  },
  // TODO: Date start from DateNow()
]

const Projects = () => {
  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5'>
          <ProjectContainer />
          <ProjectContainer />
          <ProjectContainer />
          <ProjectContainer />
        </div>
      </div>
    </Layout>
  )
}

export default Projects
