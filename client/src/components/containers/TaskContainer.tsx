import { ITask } from '../../pages/Tasks'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ITaskContainer {
  task: ITask
  withBtn?: boolean
  getProjectById?: (id: number) => void
  getEmployeeById?: (id: number) => void
}

const TaskContainer: FC<ITaskContainer> = ({
  task,
  withBtn = true,
  getProjectById,
  getEmployeeById,
}) => {
  return (
    <div className='border border-gray-400 shadow-mainShadow bg-white rounded-lg px-4 py-2 h-full'>
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
        {withBtn && (
          <>
            <Button
              text='Project'
              type='button'
              handlerClick={() => getProjectById?.(task.id)}
            />
            <Button
              text='Employee'
              type='button'
              handlerClick={() => getEmployeeById?.(task.id)}
            />
          </>
        )}
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
