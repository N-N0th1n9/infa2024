import { IInitialValue } from '../components/UI/MyForm'
import initialTeamInputFields from '../constants/teamInputFields'
import { IEmployee } from '../pages/Employees'
import { IProject } from '../pages/Projects'
import { ITeam } from '../pages/Teams'
import { fetchEmployees } from '../services/employee-api'
import { fetchProjects } from '../services/project-api'
import {
  createTeam,
  deleteTeam,
  fetchEmployee,
  fetchProject,
  fetchTeams,
} from '../services/team-api'
import { useEffect, useState } from 'react'

export const useTeams = () => {
  const [teams, setTeams] = useState<ITeam[]>([])
  const [projects, setProjects] = useState<IProject[] | null>(null)
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [teamInputFields, setTeamInputFields] = useState(initialTeamInputFields)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchTeams()
        setTeams(data)

        const allEmployees = await fetchEmployees()
        const leadOrSeniorEmployees = allEmployees.filter((employee: IEmployee) => {
          const position = employee.position.toLowerCase()
          return position.includes('lead') || position.includes('senior')
        })
        const projects = await fetchProjects()

        const updatedFields = initialTeamInputFields.map(field => {
          if (field.name === 'teamlead_id') {
            return {
              ...field,
              options: leadOrSeniorEmployees.map((lead: IEmployee) => lead.id),
            }
          }
          if (field.name === 'project_id') {
            return {
              ...field,
              options: projects.map((project: IProject) => project.id),
            }
          }
          return field
        })

        setTeamInputFields(updatedFields)
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getProject = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await fetchProject(id)
      setProjects(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEmployee = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await fetchEmployee(id)
      setEmployees(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewTeam = async (values: IInitialValue) => {
    setIsLoading(true)
    try {
      await createTeam(values)
      const data = await fetchTeams()
      setTeams(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeTeam = async (id: number) => {
    setIsLoading(true)
    try {
      await deleteTeam(id)
      setTeams(prevTeams => prevTeams.filter(team => team.id !== id))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    teams,
    projects,
    employees,
    isLoading,
    error,
    teamInputFields,
    getProject,
    getEmployee,
    createNewTeam,
    removeTeam,
  }
}
