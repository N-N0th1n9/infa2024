import { IInitialValue } from '../components/UI/MyForm'

const API_BASE_URL = 'http://localhost:3000'

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export const fetchClientById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/client/project/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching client:', error)
    throw error
  }
}

export const createProject = async (values: IInitialValue) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export const updateProject = async (values: IInitialValue) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/update/${values.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export const deleteProject = async (id: number) => {
  try {
    await fetch(`${API_BASE_URL}/project/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

export const callIncreaseDueDate = async value => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/increaseDueDate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error calling increase:', error)
    throw error
  }
}
