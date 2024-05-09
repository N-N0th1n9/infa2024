import Button from './Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const EmployeeContainer = () => {
  return (
    <div className='rounded-lg px-4 py-2 drop-shadow-2xl	border border-gray-400 shadow-mainShadow'>
      <div className='flex flex-col gap-2'>
        <span>
          id: <span className='text-mainRed'>2</span>
        </span>
        <span>
          name: <span className='text-mainRed'>Vladislav</span>
        </span>
        <span>
          surname: <span className='text-mainRed'>Tsiganov</span>
        </span>
        <div>
          <span>skills:</span>
          <p className='text-sm text-mainRed'>
            TypeScript, JS, React, Zustant, NextJS, NestJs, Sosat
          </p>
        </div>
        <span>
          Position: <span className='text-mainRed'>Senior Frontend</span>
        </span>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex gap-3'>
          <Link to='/project/:id'>
            <Button
              text='Team'
              type='button'
            />
          </Link>
          <Link to='/project/:id'>
            <Button text='Tasks' />
          </Link>
        </div>
        <div className='flex gap-4'>
          <Link to='/client/edit/:id'>
            <MdModeEdit size={27} />
          </Link>
          <button>
            <MdDelete size={27} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeContainer
