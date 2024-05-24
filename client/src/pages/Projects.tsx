import BaseModal from '../components/UI/BaseModal'
import MyForm from '../components/UI/MyForm'
import ClientContainer from '../components/containers/ClientContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
import { IClient } from './Clients'
import { useContext, useEffect, useState } from 'react'

const fields: IFormFields[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name*',
  },
  {
    name: 'surname',
    type: 'text',
    label: 'Surname*',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
  },
  {
    name: 'client_name',
    type: 'text',
    label: 'Client name*',
  },
  {
    name: 'client_surname',
    type: 'text',
    label: 'Client surname*',
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone*',
  },
  {
    name: 'email*',
    type: 'email',
    label: 'Email*',
  },
  {
    name: 'team_id',
    type: 'text',
    label: 'Team ID*',
  },
  // TODO: Date start from DateNow()
]

export interface IProject {
  id: number
  name: string
  description: string
  date_start: number
  date_end: number
}

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [client, setClient] = useState<IClient | null>(null)
  const { setIsOpen } = useContext(IsOpenModalContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const getClientById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/client/project/${id}`)
      const data = await response.json()

      setClient(data[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }

    setIsOpen(true)
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5'>
          {projects.length ? (
            projects.map(project => (
              <div key={project.id}>
                <ProjectContainer
                  project={project}
                  getClientById={getClientById}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No projects found :(</h2>
          )}
        </div>
        <BaseModal>
          {client === null ? (
            ''
          ) : (
            <ClientContainer
              client={client}
              withBtn={false}
            />
          )}
        </BaseModal>
      </div>
    </Layout>
  )
}

export default Projects
