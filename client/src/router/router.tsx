import Clients from '../pages/Clients'
import Employee from '../pages/Employees'
import HomePage from '../pages/HomePage'
import Projects from '../pages/Projects'
import Tasks from '../pages/Tasks'
import Teams from '../pages/Teams'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    // errorElement:
  },
  {
    path: '/clients',
    element: <Clients />,
  },
  {
    path: '/employees',
    element: <Employee />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/tasks',
    element: <Tasks />,
  },
  {
    path: '/teams',
    element: <Teams />,
  },
])

export default router
