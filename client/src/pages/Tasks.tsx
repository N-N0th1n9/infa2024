import MyForm from '../components/UI/MyForm'
import Layout from '../components/containers/Layout'
import TaskContainer from '../components/containers/TaskContainer'
import { IFormFields } from '../types/formFields'
import { useEffect, useState } from 'react'

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

export interface ITask {
  id: number
  description: string
  status: string
  data_start: number
  data_end: number
  project_id: number
}

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks')
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5 w-full'>
          {tasks.length ? (
            tasks.map(task => (
              <div key={task.id}>
                <TaskContainer task={task} />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No tasks found :(</h2>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Tasks
