import Button from './Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const TaskContainer = () => {
  return (
    <div className='border border-gray-400 shadow-mainShadow rounded-lg px-4 py-2'>
      <div className='flex flex-col gap-2'>
        <span>
          id: <span className='text-mainRed'>2</span>
        </span>
        <div>
          <span>description:</span>
          <p className='text-sm text-mainRed'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta delectus
            dolor aut expedita ipsum recusandae laudantium ducimus corrupti nihil.
          </p>
        </div>
        {/* TODO: Change the color of the status */}
        <span>
          status: <span className='text-mainRed'>Completed</span>
        </span>
        <span>
          Date start: <span className='text-mainRed'>29.04.2024</span>
        </span>
        <span>
          Date end: <span className='text-mainRed'>29.05.2024</span>
        </span>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <Link to='/project/:id'>
          <Button
            text='Project'
            type='button'
          />
        </Link>
        <Link to='/project/:id'>
          <Button
            text='Employee'
            type='button'
          />
        </Link>
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

export default TaskContainer
