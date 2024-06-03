export interface IFormFields {
  name: string
  type?: 'text' | 'select' | 'email' | 'date'
  label?: string
  options?: string[]
  value?: string
}
