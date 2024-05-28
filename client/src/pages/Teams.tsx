import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import TeamContainer from '../components/containers/TeamContainer'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
import { IEmployee } from './Employees'
import { IProject } from './Projects'
import { useContext, useEffect, useState } from 'react'

const fields: IFormFields[] = [
  {
    name: 'role',
    type: 'text',
    label: 'Role*',
  },
  {
    name: 'teamlead_id',
    type: 'text',
    label: 'TeamLead ID*',
  },
  {
    name: 'project_id',
    type: 'text',
    label: 'Project ID*',
  },
]

export interface ITeam {
  id: number
  teamlead_id: string
  role: string
}

const Teams = () => {
  const [teams, setTeams] = useState<ITeam[]>([])
  const [projects, setProjects] = useState<IProject[] | null>(null)
  const [employees, setEmployees] = useState<IEmployee[] | null>(null)
  const { setIsOpen } = useContext(IsOpenModalContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/teams')
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const getProjectById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/project/team/${id}`)
      const data = await response.json()

      setProjects(data)
      setEmployees(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  const getEmployeesById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/team/${id}`)
      const data = await response.json()

      setEmployees(data)
      setProjects(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  const createTeam = async (values: IInitialValue) => {
    await fetch('http://localhost:3000/team/create', {
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

  const deleteTeam = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/team/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setTeams(prevTeams => prevTeams.filter(team => team.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={fields}
          onSubmit={createTeam}
        />
        <div className='flex flex-col gap-5 w-full'>
          {teams.length ? (
            teams.map(team => (
              <div key={team.id}>
                <TeamContainer
                  team={team}
                  getProjectById={getProjectById}
                  getEmployeesById={getEmployeesById}
                  deleteTeam={deleteTeam}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No teams found :(</h2>
          )}
        </div>
      </div>
      <BaseModal>
        <div className='grid grid-cols-3 gap-5'>
          {projects !== null &&
            projects.map((project: IProject) => (
              <div key={project.id}>
                <ProjectContainer
                  project={project}
                  withBtn={false}
                />
              </div>
            ))}
          {employees !== null &&
            employees.map((employee: IEmployee) => (
              <div key={employee.id}>
                <EmployeeContainer
                  employee={employee}
                  withBtn={false}
                />
              </div>
            ))}
        </div>
      </BaseModal>
    </Layout>
  )
}

export default Teams
