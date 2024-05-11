import MyForm from '../components/UI/MyForm'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import { IFormFields } from '../types/formFields'
import { useEffect, useState } from 'react'

const fields: IFormFields[] = [
  {
    name: 'clientId',
    type: 'text',
    label: 'Client ID* (or create new)',
  },
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
  // TODO: Date start from DateNow()
]

export interface IProject {
  id: number
  name: string
  description: string
  data_start: number
  data_end: number
}

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([])

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

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='grid grid-cols-3 gap-5'>
          {projects.length ? (
            projects.map(project => (
              <div key={project.id}>
                <ProjectContainer project={project} />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No projects found :(</h2>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Projects
