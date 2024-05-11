import { RouterProvider } from 'react-router-dom'
import Footer from './components/containers/Footer'
import Header from './components/containers/Header/Header'
import router from './router/router'
import './styles/index.css'

const App = () => {
  return (
    <div className='flex flex-col justify-between content-stretch'>
      <Header />
      <div className='flex mx-auto w-[1280px] h-full flex-grow'>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  )
}

export default App
