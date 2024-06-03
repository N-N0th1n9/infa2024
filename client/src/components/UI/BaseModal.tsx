import { IsOpenModalContext } from '../../providers/modalProvider'
import { ReactNode, useContext } from 'react'

const BaseModal = ({ children }: { children: ReactNode }) => {
  const { isOpen, setIsOpen } = useContext(IsOpenModalContext)

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen({
      base: false,
      edit: false,
    })
  }

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 z-50 bg-black/70 flex ${isOpen.base || isOpen.edit ? '' : 'hidden'}`}
      onClick={closeModal}
    >
      <div
        className='m-auto mt-[220px] rounded-lg'
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default BaseModal
