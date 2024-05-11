import { IEmployee } from '../../pages/Employees'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const EmployeeContainer = ({ employee }: { employee: IEmployee }) => {
  return (
    <div className='rounded-lg px-4 py-2 drop-shadow-2xl	border border-gray-400 shadow-mainShadow h-full'>
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
          <Link to='/project/:id'>
            <Button
              text='Team'
              type='button'
            />
          </Link>
          <Link to='/project/:id'>
            <Button
              text='Tasks'
              type='button'
            />
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
