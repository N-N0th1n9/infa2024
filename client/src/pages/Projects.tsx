import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
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
    name: 'email',
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

type IProjectWithoutId = Omit<IProject, 'id'>
type IClientWithoutId = Omit<IClient, 'id'>

export interface ICreateProjectFields extends IProjectWithoutId, IClientWithoutId {
  team_id: string
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

  const createProject = async (values: IInitialValue) => {
    await fetch('http://localhost:3000/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const deleteProject = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/project/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setProjects(prevProjects => prevProjects.filter(project => project.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={fields}
          onSubmit={createProject}
        />
        <div className='grid grid-cols-3 gap-5'>
          {projects.length ? (
            projects.map(project => (
              <div key={project.id}>
                <ProjectContainer
                  project={project}
                  getClientById={getClientById}
                  deleteProject={deleteProject}
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
