import { ButtonHTMLAttributes, FC } from 'react'

interface IButtonProps {
  text: string
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlerClick?: (arg0: any) => any
}

const Button: FC<IButtonProps> = ({ text, type, handlerClick }) => {
  return (
    <button
      className='bg-black text-white rounded-lg p-2.5 hover:bg-slate-800 transition'
      type={type}
      onClick={handlerClick}
    >
      {text}
    </button>
  )
}

export default Button
