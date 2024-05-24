import { IFormFields } from '../../types/formFields'
import Button from './Button'
import { ErrorMessage, Field, Form, Formik } from 'formik'

interface IInitialValue {
  [key: string]: string
}

const MyForm = ({ fields }: { fields: IFormFields[] }) => {
  const initialValues: IInitialValue = fields.reduce((acc, field) => {
    acc[field.name] = ''
    return acc
  }, {} as IInitialValue)

  console.log(initialValues)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
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
                className='border border-gray-500 px-2 rounded-lg w-[268px]'
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
