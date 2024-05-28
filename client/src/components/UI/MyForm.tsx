import { IFormFields } from '../../types/formFields'
import Button from './Button'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FC } from 'react'

interface IMyFrom {
  fields: IFormFields[]
  onSubmit?: (values: IInitialValue) => void
}

export interface IInitialValue {
  [key: string]: string
}

const MyForm: FC<IMyFrom> = ({ fields, onSubmit }) => {
  const initialValues: IInitialValue = fields.reduce((acc, field) => {
    acc[field.name] = ''
    return acc
  }, {} as IInitialValue)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSubmit?.(values)
      }}
    >
      <Form className='flex flex-col gap-3 max-w-[268px]'>
        {fields.map(field => (
          <div key={field.label}>
            <div>
              <label htmlFor={field.name}>{field.label}</label>
              <Field
                name={field.name}
                type={field.type}
              />
            </div>
            <ErrorMessage name={field.name} />
          </div>
        ))}
        <Button
          text='Submit'
          type='submit'
        />
      </Form>
    </Formik>
  )
}

export default MyForm
