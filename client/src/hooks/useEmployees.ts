import { IInitialValue } from '../components/UI/MyForm'
import initialEmployeeInputFields from '../constants/employeeInputFields'
import { IEmployee } from '../pages/Employees'
import { ITask } from '../pages/Tasks'
import { ITeam } from '../pages/Teams'
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  fetchTaskById,
  fetchTeamById,
} from '../services/employee-api'
import { fetchTeams } from '../services/team-api'
import { IFormFields } from '../types/formFields'
import { useEffect, useState } from 'react'

export const useEmployees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [team, setTeam] = useState<ITeam | null>(null)
  const [tasks, setTasks] = useState<ITask[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [employeeInputFields, setEmployeeInputFields] = useState(
    initialEmployeeInputFields
  )

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchEmployees()
        setEmployees(data)

        const teams = await fetchTeams()

        // Add options to inputField 'team_id'
        const updatedFields = initialEmployeeInputFields.map((field: IFormFields) => {
          if (field.name === 'team_id') {
            return {
              ...field,
              options: teams.map((team: ITeam) => team.id),
            }
          }
          return field
        })

        setEmployeeInputFields(updatedFields)
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getTeams = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await fetchTeamById(id)
      setTeam(data[0])
      setTasks(null)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTasks = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await fetchTaskById(id)
      setTasks(data)
      setTeam(null)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewEmployee = async (values: IInitialValue) => {
    setIsLoading(true)
    try {
      await createEmployee(values)
      const data = await fetchEmployees()
      setEmployees(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeEmployee = async (id: number) => {
    setIsLoading(true)
    try {
      await deleteEmployee(id)
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    employees,
    team,
    tasks,
    isLoading,
    error,
    employeeInputFields,
    getTeams,
    getTasks,
    createNewEmployee,
    removeEmployee,
  }
}
