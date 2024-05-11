import { ITeam } from '../../pages/Teams'
import Button from '../UI/Button'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { Link } from 'react-router-dom'

const TeamContainer = ({ team }: { team: ITeam }) => {
  return (
    <div className='border border-gray-400 shadow-mainShadow rounded-lg px-4 py-2 flex justify-between'>
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

export default TeamContainer
