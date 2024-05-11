import { IClient } from '../../pages/Clients'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const ClientContainer = ({ client }: { client: IClient }) => {
  return (
    <div className='border border-gray-400 rounded-lg px-4 py-2 flex justify-between shadow-mainShadow w-full'>
      <div className='flex items-center gap-10'>
        <span>
          id: <p className='text-mainRed'>{client.id}</p>
        </span>
        <span>
          name: <p className='text-mainRed'>{client.name}</p>
        </span>
        <span>
          surname: <p className='text-mainRed'>{client.surname}</p>
        </span>
        {/* TODO: Something to do with clicking on a phone number. */}
        <span>
          phone:{' '}
          <a
            href='tel:89106811810'
            className='text-mainRed block'
          >
            {client.phone}
          </a>
        </span>
        <span>
          email: <p className='text-mainRed'>{client.email}</p>
        </span>
      </div>
      <div className='flex items-center gap-5'>
        <Link to='/project/:id'>
          <Button
            text='Go to project'
            type='button'
          />
        </Link>
        <Link to='/client/edit/:id'>
          <MdModeEdit size={27} />
        </Link>
        <button>
          <MdDelete size={27} />
        </button>
      </div>
    </div>
  )
}

export default ClientContainer
