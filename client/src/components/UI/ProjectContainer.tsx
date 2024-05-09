import Button from './Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const ProjectContainer = () => {
  return (
    <div className='border border-gray-400 shadow-mainShadow rounded-lg px-4 py-2'>
      <div className='flex flex-col gap-2'>
        <span>
          id: <span className='text-mainRed'>2</span>
        </span>
        <span>
          name: <span className='text-mainRed'>Majestic</span>
        </span>
        <div>
          <span>description:</span>
          <p className='text-sm text-mainRed'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta delectus
            dolor aut expedita ipsum recusandae laudantium ducimus corrupti nihil.
          </p>
        </div>
        <div className='flex flex-col'>
          <span>
            Date start: <span className='text-mainRed'>29.04.2024</span>
          </span>
          <span>
            Date end: <span className='text-mainRed'>29.05.2024</span>
          </span>
        </div>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <Link to='/project/:id'>
          <Button
            text='Go to client'
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

export default ProjectContainer
