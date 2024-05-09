import ClientContainer from '../components/UI/ClientContainer'
import MyForm from '../components/UI/MyForm'
import Layout from '../components/containers/Layout'
import { IFormFields } from '../types/formFields'

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

const Clients = () => {
  fetch('http://localhost:3000/client')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      // Обработка полученных данных
      console.log(data)
    })
    .catch(error => {
      // Обработка ошибок
      console.error('Fetch error:', error)
    })

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm fields={fields} />
        <div className='flex flex-col gap-5 w-full'>
          {/* TODO: replace with a list of clients from the database  */}
          <ClientContainer />
          <ClientContainer />
        </div>
      </div>
    </Layout>
  )
}

export default Clients
