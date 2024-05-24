import { IClient } from '../../pages/Clients'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IClientContainer {
  client: IClient
  withBtn?: boolean
  getProjectById?: (id: number) => void
}

const ClientContainer: FC<IClientContainer> = ({
  client,
  withBtn = true,
  getProjectById,
}) => {
  return (
    <div className='border border-gray-400 rounded-lg px-4 py-2 flex bg-white justify-between shadow-mainShadow w-full gap-5'>
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
        {withBtn ? (
          <Button
            text='Go to project'
            type='button'
            handlerClick={() => getProjectById?.(client.id)}
          />
        ) : (
          ''
        )}
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
