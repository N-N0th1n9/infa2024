import MyForm from '../components/UI/MyForm'
import ClientContainer from '../components/containers/ClientContainer'
import Layout from '../components/containers/Layout'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
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
    name: 'phone',
    type: 'text',
    label: 'Phone*',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email*',
  },
  // TODO: it is necessary to routing to the project creation
]

export interface IClient {
  id: number
  name: string
  surname: string
  phone: string
  email: string
}

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const { isOpen, setIsOpen } = useContext(IsOpenModalContext)

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

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='flex flex-col gap-5 w-full'>
          {clients.length ? (
            clients.map(client => (
              <div key={client.id}>
                <ClientContainer client={client} />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No clients found :(</h2>
          )}
        </div>
        {/* <BaseModal isOpen={!isOpen}><ProjectContainer /></BaseModal> */}
      </div>
    </Layout>
  )
}

export default Clients
