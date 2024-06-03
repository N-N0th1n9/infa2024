import { IClient } from '../pages/Clients'
import { IProject } from '../pages/Projects'
import { deleteClient, fetchClients, fetchProject } from '../services/client-api'
import { useEffect, useState } from 'react'

export const useClient = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [project, setProject] = useState<IProject | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchClients()
        setClients(data)
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
      setProject(data[0])
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeClient = async (id: number) => {
    setIsLoading(true)
    try {
      await deleteClient(id)
      setClients(prevClients => prevClients.filter(client => client.id !== id))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    clients,
    project,
    isLoading,
    error,
    getProject,
    removeClient,
  }
}
