import BaseModal from '../components/UI/BaseModal'
import Button from '../components/UI/Button'
import ClientContainer from '../components/containers/ClientContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IProject } from './Projects'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export interface IClient {
  id: number
  name: string
  surname: string
  phone: string
  email: string
}

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [project, setProject] = useState<IProject | null>(null)
  const { setIsOpen } = useContext(IsOpenModalContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/clients')
        const data = await response.json()
        setClients(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const getProjectById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/project/client/${id}`)
      const data = await response.json()

      setProject(data[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsOpen(true)
  }

  return (
    <Layout>
      <div className='flex gap-5'>
        <Link to='/projects'>
          <Button
            text='Create new project'
            type='button'
          />
        </Link>
        <div className='flex flex-col gap-5 w-full'>
          {clients.length ? (
            clients.map(client => (
              <div key={client.id}>
                <ClientContainer
                  client={client}
                  getProjectById={getProjectById}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>Loading...</h2>
          )}
        </div>
        <BaseModal>
          {project === null ? (
            ''
          ) : (
            <ProjectContainer
              project={project}
              withBtn={false}
            />
          )}
        </BaseModal>
      </div>
    </Layout>
  )
}

export default Clients
