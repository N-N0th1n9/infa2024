import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
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
    name: 'project_id',
    type: 'text',
    label: 'Project ID*',
  },
  {
    name: 'employee_id',
    type: 'text',
    label: 'Employee ID*',
  },
]

export interface ITask {
  id: number
  description: string
  status: string
  date_start: number
  date_end: number
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

      setEmployee(data[0])
      setProject(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  const createTask = async (values: IInitialValue) => {
    await fetch('http://localhost:3000/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok`)
        }
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/task/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={fields}
          onSubmit={createTask}
        />
        <div className='grid grid-cols-3 gap-5 w-full'>
          {tasks.length ? (
            tasks.map(task => (
              <div key={task.id}>
                <TaskContainer
                  task={task}
                  getProjectById={getProjectById}
                  getEmployeeById={getEmployeeById}
                  deleteTask={deleteTask}
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
