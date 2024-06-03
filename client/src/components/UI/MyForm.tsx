import '../../styles/datepickerCastom.css'
import { IFormFields } from '../../types/formFields'
import Button from './Button'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FC, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AnyObject, ObjectSchema } from 'yup'

interface IMyFrom {
  fields: IFormFields[]
  onSubmit: (values: IInitialValue) => void
  ValidationSchema: ObjectSchema<AnyObject>
  editFields?: IInitialValue
}

export interface IInitialValue {
  [key: string]: string | Date | number | null
}

const MyForm: FC<IMyFrom> = ({ fields, onSubmit, ValidationSchema, editFields }) => {
  const initialValues: IInitialValue = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = editFields ? editFields[field.name] || '' : ''
      return acc
    }, {} as IInitialValue)
  }, [fields, editFields])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className='flex flex-col gap-3 w-[290px]'>
          {fields.map(
            field =>
              field.name !== 'id' && (
                <div key={field.name}>
                  <div>
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === 'select' ? (
                      <Field
                        name={field.name}
                        as='select'
                        className='w-full'
                      >
                        <option value=''>{field.value || 'Select'}</option>
                        {field.options?.map((option: string) => (
                          <option
                            value={option}
                            key={option}
                          >
                            {option}
                          </option>
                        ))}
                      </Field>
                    ) : field.type === 'date' ? (
                      <DatePicker
                        selected={(values[field.name] as Date) || null}
                        onChange={date => setFieldValue(field.name, date)}
                        dateFormat='yyyy-MM-dd'
                        className='h-7'
                        showIcon
                        isClearable
                      />
                    ) : (
                      <Field
                        name={field.name}
                        type={field.type}
                        className='form-control'
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name={field.name}
                    render={msg => <div className='text-mainRed'>{msg}</div>}
                  />
                </div>
              )
          )}
          <Button
            text='Submit'
            type='submit'
          />
        </Form>
      )}
    </Formik>
  )
}

export default MyForm
