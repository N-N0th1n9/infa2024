import Button from './Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const ClientContainer = () => {
  return (
    <div className='border border-gray-400 rounded-lg px-4 py-2 flex justify-between shadow-mainShadow w-full'>
      <div className='flex gap-10 items-center'>
        <span>
          id: <p className='text-mainRed'>2</p>
        </span>
        <span>
          name: <p className='text-mainRed'>Vladislav</p>
        </span>
        <span>
          surname: <p className='text-mainRed'>Tsiganov</p>
        </span>
        {/* TODO: Something to do with clicking on a phone number. */}
        <span>
          phone:{' '}
          <a
            href='tel:89106811810'
            className='text-mainRed block'
          >
            89106811810
          </a>
        </span>
        <span>
          email: <p className='text-mainRed'>vladislav.tsiganov@gmail.com</p>
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
