import { IInitialValue } from '../components/UI/MyForm'
import initialProjectInputFields from '../constants/projectInputFields'
import { IClient } from '../pages/Clients'
import { IProject } from '../pages/Projects'
import { ITeam } from '../pages/Teams'
import {
  callIncreaseDueDate,
  createProject,
  deleteProject,
  fetchClientById,
  fetchProjects,
  updateProject,
} from '../services/project-api'
import { fetchTeamProject, fetchTeams } from '../services/team-api'
import { IFormFields } from '../types/formFields'
import { useEffect, useState } from 'react'

export const useProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [client, setClient] = useState<IClient | null>(null)
  const [editFields, setEditFields] = useState<IInitialValue>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [projectInputFields, setProjectInputFields] = useState(initialProjectInputFields)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchProjects()
        setProjects(data)

        const teams = await fetchTeams()

        // Add options to inputField 'team_id'
        const updatedFields = initialProjectInputFields.map((field: IFormFields) => {
          if (field.name === 'team_id') {
            return {
              ...field,
              options: teams.map((team: ITeam) => team.id),
            }
          }
          return field
        })

        setProjectInputFields(updatedFields)
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getClient = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await fetchClientById(id)
      setClient(data[0])
      return data[0]
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewProject = async (values: IInitialValue) => {
    setIsLoading(true)
    try {
      await createProject(values)
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const editProject = async (values: IInitialValue) => {
    setIsLoading(true)
    try {
      await updateProject(values)
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeProject = async (id: number) => {
    setIsLoading(true)
    try {
      await deleteProject(id)
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const fieldsEditProject = async (id: number) => {
    setIsLoading(true)
    try {
      const project = projects.find(project => project.id === id)
      if (!project) throw new Error(`Project with id ${id} not found`)

      const client: IClient = await getClient(id)

      const team = await fetchTeamProject(id)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { date_start, ...projectWithoutId } = project

      setEditFields({
        ...projectWithoutId,
        client_name: client.name,
        client_surname: client.surname,
        phone: client.phone,
        email: client.email,
        team_id: team[0]?.id,
      })
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const increaseDueDate = async (value: IInitialValue) => {
    setIsLoading(true)
    try {
      await callIncreaseDueDate(value)
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    projects,
    client,
    isLoading,
    error,
    projectInputFields,
    editFields,
    setProjectInputFields,
    getClient,
    createNewProject,
    removeProject,
    fieldsEditProject,
    editProject,
    increaseDueDate,
  }
}
