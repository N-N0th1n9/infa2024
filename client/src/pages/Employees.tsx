import MyForm from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import { IFormFields } from '../types/formFields'
import { useEffect, useState } from 'react'

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

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5'>
          {employees.length ? (
            employees.map(employee => (
              <div key={employee.id}>
                <EmployeeContainer employee={employee} />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No employees found :(</h2>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Employee
