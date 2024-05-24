import BaseModal from '../components/UI/BaseModal'
import MyForm from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import TaskContainer from '../components/containers/TaskContainer'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
import { IEmployee } from './Employees'
import { IProject } from './Projects'
import { useContext, useEffect, useState } from 'react'

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
  const [project, setProject] = useState<IProject | null>(null)
  const [employee, setEmployee] = useState<IEmployee | null>(null)
  const { setIsOpen } = useContext(IsOpenModalContext)

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

  const getProjectById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/project/task/${id}`)
      const data = await response.json()

      setProject(data[0])
      setEmployee(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  const getEmployeeById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/task/${id}`)
      const data = await response.json()

      console.log(data)
      setEmployee(data[0])
      setProject(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5 w-full'>
          {tasks.length ? (
            tasks.map(task => (
              <div key={task.id}>
                <TaskContainer
                  task={task}
                  getProjectById={getProjectById}
                  getEmployeeById={getEmployeeById}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No tasks found :(</h2>
          )}
        </div>
      </div>
      <BaseModal>
        {project !== null && (
          <ProjectContainer
            project={project}
            withBtn={false}
          />
        )}
        {employee !== null && (
          <EmployeeContainer
            employee={employee}
            withBtn={false}
          />
        )}
      </BaseModal>
    </Layout>
  )
}

export default Tasks
