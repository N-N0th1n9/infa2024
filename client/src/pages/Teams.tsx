import BaseModal from '../components/UI/BaseModal'
import MyForm from '../components/UI/MyForm'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import TeamContainer from '../components/containers/TeamContainer'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
import { IProject } from './Projects'
import { useContext, useEffect, useState } from 'react'

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
  const [projects, setProjects] = useState<IProject[] | null>(null)
  const { setIsOpen } = useContext(IsOpenModalContext)

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

  const getProjectById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/project/team/${id}`)
      const data = await response.json()

      setProjects(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='flex flex-col gap-5 w-full'>
          {teams.length ? (
            teams.map(team => (
              <div key={team.id}>
                <TeamContainer
                  team={team}
                  getProjectById={getProjectById}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No teams found :(</h2>
          )}
        </div>
      </div>
      <BaseModal>
        {projects !== null && (
          <div className='grid grid-cols-3 gap-5'>
            {projects.map(project => (
              <ProjectContainer
                project={project}
                withBtn={false}
                getClientById={getProjectById}
              />
            ))}
          </div>
        )}
      </BaseModal>
    </Layout>
  )
}

export default Teams
