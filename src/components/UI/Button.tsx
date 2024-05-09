import { ButtonHTMLAttributes, FC } from 'react'

interface IButtonProps {
  text: string
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const Button: FC<IButtonProps> = ({ text, type }) => {
  return (
    <button
      className='bg-black text-white rounded-lg p-2.5 hover:bg-slate-800 transition'
      type={type}
    >
      {text}
    </button>
  )
}

export default Button
