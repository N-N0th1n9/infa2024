import Footer from './Footer'
import Header from './Header/Header'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col justify-between'>
      <Header />
      <div className='grow w-[1280px] mx-auto'>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
