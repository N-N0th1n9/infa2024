import { IsOpenModalContext } from '../../providers/modalProvider'
import { FC, ReactNode, useContext } from 'react'

interface IBaseModal {
  children: ReactNode
  isOpen: boolean
}

const BaseModal: FC<IBaseModal> = ({ children, isOpen }) => {
  const { setIsOpen } = useContext(IsOpenModalContext)

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 z-50 bg-black/70 flex ${!isOpen ? 'hidden' : ''}`}
      onClick={closeModal}
    >
      <div
        className='bg-white m-auto mt-[430px] rounded-lg'
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default BaseModal
