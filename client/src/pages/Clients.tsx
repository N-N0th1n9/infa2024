import BaseModal from '../components/UI/BaseModal'
import Button from '../components/UI/Button'
import ClientContainer from '../components/containers/ClientContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import { useClient } from '../hooks/useClient'
import { IsOpenModalContext } from '../providers/modalProvider'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export interface IClient {
  id: number
  name: string
  surname: string
  phone: string
  email: string
}

const Clients = () => {
  const {
    clients,
    project,
    isLoading,
    // error
    getProject,
    removeClient,
  } = useClient()
  const { setIsOpen } = useContext(IsOpenModalContext)

  const handleGetProjectById = async (id: number) => {
    await getProject(id)
    setIsOpen({
      base: true,
      edit: false,
    })
  }

  const handleDeleteClient = async (id: number) => {
    await removeClient(id)
  }

  if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className='flex gap-5'>
        <Link
          to='/projects'
          className='w-[250px] *:w-full'
        >
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
                  getProjectById={handleGetProjectById}
                  deleteClient={handleDeleteClient}
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
