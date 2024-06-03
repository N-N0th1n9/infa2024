import { IInitialValue } from '../components/UI/MyForm'

export const fetchTeams = async () => {
  try {
    const response = await fetch('http://localhost:3000/teams')
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchProject = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/project/team/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching team:', error)
    throw error
  }
}

export const fetchEmployee = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/employees/team/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching Task:', error)
    throw error
  }
}

export const fetchTeamProject = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/team/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching Task:', error)
    throw error
  }
}

export const createTeam = async (values: IInitialValue) => {
  try {
    const response = await fetch('http://localhost:3000/team/create', {
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

export const deleteTeam = async (id: number) => {
  try {
    await fetch(`http://localhost:3000/team/delete/${id}`, {
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
