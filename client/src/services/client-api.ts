import { IInitialValue } from '../components/UI/MyForm'

export const fetchClients = async () => {
  try {
    const response = await fetch('http://localhost:3000/clients')
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchProject = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/project/client/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching team:', error)
    throw error
  }
}

export const createClient = async (values: IInitialValue) => {
  try {
    const response = await fetch('http://localhost:3000/client/create', {
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

export const deleteClient = async (id: number) => {
  try {
    await fetch(`http://localhost:3000/client/delete/${id}`, {
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
