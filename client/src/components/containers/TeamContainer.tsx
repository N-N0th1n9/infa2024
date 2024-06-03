import { ITeam } from '../../pages/Teams'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ITaskContainer {
  team: ITeam
  withBtn?: boolean
  getProjectById?: (id: number) => void
  getEmployeesById?: (id: number) => void
  deleteTeam?: (id: number) => void
}

const TeamContainer: FC<ITaskContainer> = ({
  team,
  withBtn = true,
  getProjectById,
  getEmployeesById,
  deleteTeam,
}) => {
  return (
    <div className='border border-gray-400 bg-white shadow-mainShadow rounded-lg px-4 py-2 flex justify-between gap-5'>
      <div className='flex gap-5 items-center'>
        <span>
          id: <span className='text-mainRed'>{team.id}</span>
        </span>
        {/* TODO: Routing to an employee */}
        <span>
          teamLid: <span className='text-mainRed'>{team.teamlead_id}</span>
        </span>
        <span>
          role: <span className='text-mainRed'>{team.role}</span>
        </span>
      </div>
      <div className='flex items-center gap-6'>
        {withBtn ? (
          <>
            <Button
              text='Project'
              type='button'
              handlerClick={() => getProjectById?.(team.id)}
            />
            <Button
              text='Employees'
              type='button'
              handlerClick={() => getEmployeesById?.(team.id)}
            />
          </>
        ) : (
          ''
        )}
        <Link to='/client/edit/:id'>
          <MdModeEdit size={27} />
        </Link>
        <button onClick={() => deleteTeam?.(team.id)}>
          <MdDelete size={27} />
        </button>
      </div>
    </div>
  )
}

export default TeamContainer
