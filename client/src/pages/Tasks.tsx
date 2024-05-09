import MyForm from '../components/UI/MyForm'
import TaskContainer from '../components/UI/TaskContainer'
import Layout from '../components/containers/Layout'
import { IFormFields } from '../types/formFields'

const fields: IFormFields[] = [
  {
    name: 'description',
    type: 'text',
    label: 'Description*',
  },
  {
    name: 'projectId',
    type: 'text',
    label: 'Project ID*',
  },
]

const Tasks = () => {
  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5'>
          <TaskContainer />
          <TaskContainer />
          <TaskContainer />
          <TaskContainer />
        </div>
      </div>
    </Layout>
  )
}

export default Tasks
