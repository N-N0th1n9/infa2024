import { IInitialValue } from '../components/UI/MyForm'
import initialTaskInputFields from '../constants/tasksInputFields'
import { IEmployee } from '../pages/Employees'
import { IProject } from '../pages/Projects'
import { ITask } from '../pages/Tasks'
import { ITeam } from '../pages/Teams'
import { fetchEmployees } from '../services/employee-api'
import { fetchProjects } from '../services/project-api'
import {
  createTask,
  deleteTask,
  fetchEmployeeById,
  fetchProjectById,
  fetchTasks,
} from '../services/task-api'
import { useEffect, useState } from 'react'

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [project, setProject] = useState<IProject | null>(null)
  const [employee, setEmployee] = useState<IEmployee | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [taskInputFields, setTaskInputFields] = useState(initialTaskInputFields)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchTasks()
        setTasks(data)

        const employees = await fetchEmployees()
        const teams = await fetchProjects()

        const updatedFields = initialTaskInputFields.map(field => {
          if (field.name === 'employee_id') {
            return {
              ...field,
              options: employees.map((employee: IEmployee) => employee.id),
            }
          }
          if (field.name === 'project_id') {
            return {
              ...field,
              options: teams.map((team: ITeam) => team.id),
            }
          }

          return field
        })

        setTaskInputFields(updatedFields)
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
      const data = await fetchProjectById(id)
      setProject(data[0])
      setEmployee(null)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEmployee = async (id: number) => {
    setIsLoading(true)
    try {
      const data = await fetchEmployeeById(id)
      setEmployee(data[0])
      setProject(null)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewTask = async (values: IInitialValue) => {
    try {
      await createTask(values)
      const data = await fetchTasks()
      setTasks(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeTask = async (id: number) => {
    setIsLoading(true)
    try {
      await deleteTask(id)

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    tasks,
    project,
    employee,
    isLoading,
    error,
    taskInputFields,
    getProject,
    getEmployee,
    createNewTask,
    removeTask,
  }
}
