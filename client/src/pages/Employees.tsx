import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import TaskContainer from '../components/containers/TaskContainer'
import TeamContainer from '../components/containers/TeamContainer'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
import { ITask } from './Tasks'
import { ITeam } from './Teams'
import { useContext, useEffect, useState } from 'react'

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
    name: 'team_id',
    type: 'text',
    label: 'Team ID',
  },
  {
    name: 'skills',
    type: 'text',
    label: 'Skills',
  },
]

export interface IEmployee {
  id: number
  name: string
  skills: string[]
  position: string
  team_id: number
  surname: string
}

const Employee = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [team, setTeam] = useState<ITeam | null>(null)
  const [tasks, setTasks] = useState<ITask[] | null>(null)
  const { setIsOpen } = useContext(IsOpenModalContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees')
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const getTeamById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/team/${id}`)
      const data = await response.json()

      setTeam(data[0])
      setTasks(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  const getTaskById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`)
      const data = await response.json()

      setTasks(data)
      setTeam(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  const createEmployee = async (values: IInitialValue) => {
    await fetch('http://localhost:3000/employee/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
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

  const deleteEmployee = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/employee/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={fields}
          onSubmit={createEmployee}
        />
        <div className='grid grid-cols-3 gap-5 w-full'>
          {employees.length ? (
            employees.map(employee => (
              <div key={employee.id}>
                <EmployeeContainer
                  employee={employee}
                  getTeamById={getTeamById}
                  getTaskById={getTaskById}
                  deleteEmployee={deleteEmployee}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No employees found :(</h2>
          )}
        </div>
        <BaseModal>
          {team !== null && (
            <TeamContainer
              team={team}
              withBtn={false}
            />
          )}
          {tasks !== null && (
            <div className='grid grid-cols-3 gap-5'>
              {tasks.map(task => (
                <div key={task.id}>
                  <TaskContainer
                    task={task}
                    withBtn={false}
                  />
                </div>
              ))}
            </div>
          )}
        </BaseModal>
      </div>
    </Layout>
  )
}

export default Employee
