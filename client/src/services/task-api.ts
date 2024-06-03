import { IInitialValue } from '../components/UI/MyForm'

export const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:3000/tasks')
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchProjectById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/project/task/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchEmployeeById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/employees/task/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const createTask = async (values: IInitialValue) => {
  try {
    const response = await fetch('http://localhost:3000/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export const deleteTask = async (id: number) => {
  try {
    await fetch(`http://localhost:3000/task/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
