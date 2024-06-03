import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { createContext, useState } from 'react'

type IsOpenState = {
  base: boolean
  edit: boolean
}

export interface IOpenModal {
  isOpen: IsOpenState
  setIsOpen: Dispatch<SetStateAction<IsOpenState>>
}

export const IsOpenModalContext = createContext<IOpenModal>({
  isOpen: {
    base: false,
    edit: false,
  },
  setIsOpen: () => {},
})

export const IsOpenModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState({
    base: false,
    edit: false,
  })

  return (
    <IsOpenModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenModalContext.Provider>
  )
}
