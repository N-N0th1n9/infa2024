import { navList } from './navList'
import { Link } from 'react-router-dom'

const Header = () => {
  const link = window.location.pathname
  if (link) {
    navList.map(item => {
      if (item.path == link) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
  }

  return (
    <div className='bg-mainRed h-14 flex items-center mb-10'>
      <nav className='w-[1280px] flex justify-between mx-auto'>
        <Link to='/'>
          DB <span className='text-mainWhite'>IT Project</span>
        </Link>
        <ul className='flex gap-14'>
          {navList.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${item.isActive ? 'text-mainWhite' : 'text-black'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Header
