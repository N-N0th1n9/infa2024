import { ITask } from '../../pages/Tasks'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const TaskContainer = ({ task }: { task: ITask }) => {
  return (
    <div className='border border-gray-400 shadow-mainShadow rounded-lg px-4 py-2 h-full'>
      <div className='flex flex-col gap-2'>
        <span>
          id: <span className='text-mainRed'>{task.id}</span>
        </span>
        <div>
          <span>description:</span>
          <p className='text-sm text-mainRed'>{task.description}</p>
        </div>
        {/* TODO: Change the color of the status */}
        <span>
          status: <span className='text-mainRed'>{task.status}</span>
        </span>
        <span>
          Date start: <span className='text-mainRed'>{task.data_start}</span>
        </span>
        <span>
          Date end: <span className='text-mainRed'>{task.data_end}</span>
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
