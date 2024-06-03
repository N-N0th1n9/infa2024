import { IInitialValue } from '../components/UI/MyForm'

export const fetchEmployees = async () => {
  try {
    const response = await fetch('http://localhost:3000/employees')
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchTeamById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/team/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching team:', error)
    throw error
  }
}

export const fetchTaskById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching Task:', error)
    throw error
  }
}

export const createEmployee = async (values: IInitialValue) => {
  try {
    const response = await fetch('http://localhost:3000/employee/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const deleteEmployee = async (id: number) => {
  try {
    await fetch(`http://localhost:3000/employee/delete/${id}`, {
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
