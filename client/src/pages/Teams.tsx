import MyForm from '../components/UI/MyForm'
import Layout from '../components/containers/Layout'
import TeamContainer from '../components/containers/TeamContainer'
import { IFormFields } from '../types/formFields'
import { useEffect, useState } from 'react'

const fields: IFormFields[] = [
  {
    name: 'role',
    type: 'text',
    label: 'Role*',
  },
  {
    name: 'teamLidId',
    type: 'text',
    label: 'teamLid ID*',
  },
  {
    name: 'projectId',
    type: 'text',
    label: 'Project ID*',
  },
]

export interface ITeam {
  id: number
  teamlead_id: string
  role: string
}

const Teams = () => {
  const [teams, setTeams] = useState<ITeam[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/teams')
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='flex flex-col gap-5 w-full'>
          {teams.length ? (
            teams.map(team => (
              <div key={team.id}>
                <TeamContainer team={team} />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No teams found :(</h2>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Teams
