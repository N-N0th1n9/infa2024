import Header from './components/UI/Header/Header'
import Footer from './components/UI/containers/Footer'
import router from './router/router'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'

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
