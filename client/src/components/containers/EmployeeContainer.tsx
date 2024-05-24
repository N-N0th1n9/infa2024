import { IEmployee } from '../../pages/Employees'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IEmployeeContainer {
  employee: IEmployee
  withBtn?: boolean
  getTeamById?: (id: number) => void
  getTaskById?: (id: number) => void
}

const EmployeeContainer: FC<IEmployeeContainer> = ({
  employee,
  withBtn = true,
  getTeamById,
  getTaskById,
}) => {
  return (
    <div className=' rounded-lg px-4 py-2 bg-white	border border-gray-400 shadow-mainShadow h-full flex justify-between flex-col'>
      <div className='flex flex-col gap-2'>
        <span>
          id: <span className='text-mainRed'>{employee.id}</span>
        </span>
        <span>
          name: <span className='text-mainRed'>{employee.name}</span>
        </span>
        <span>
          surname: <span className='text-mainRed'>{employee.surname}</span>
        </span>
        <div>
          <span>skills:</span>
          <p className='text-sm text-mainRed'>
            {employee.skills.map(skill => {
              return `${skill} `
            })}
          </p>
        </div>
        <span>
          Position: <span className='text-mainRed'>{employee.position}</span>
        </span>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex gap-3'>
          {withBtn ? (
            <>
              <Button
                text='Team'
                type='button'
                handlerClick={() => getTeamById?.(employee.id)}
              />
              <Button
                text='Tasks'
                type='button'
                handlerClick={() => getTaskById?.(employee.id)}
              />
            </>
          ) : (
            ''
          )}
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
