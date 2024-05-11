import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { createContext, useState } from 'react'

export interface IOpenModal {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const IsOpenModalContext = createContext<IOpenModal>({
  isOpen: false,
  setIsOpen: () => {},
})

export const IsOpenModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <IsOpenModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenModalContext.Provider>
  )
}
