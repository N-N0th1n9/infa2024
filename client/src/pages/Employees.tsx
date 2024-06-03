import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import TaskContainer from '../components/containers/TaskContainer'
import TeamContainer from '../components/containers/TeamContainer'
import { useEmployees } from '../hooks/useEmployees'
import { IsOpenModalContext } from '../providers/modalProvider'
import { useContext } from 'react'
import * as Yup from 'yup'

const EmployeeValidSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  surname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  position: Yup.string().required('Required'),
  skills: Yup.string(),
  team_id: Yup.string().required('Required'),
})

export interface IEmployee {
  id: number
  name: string
  skills: string[]
  position: string
  team_id: number
  surname: string
}

const Employee = () => {
  const {
    employees,
    team,
    tasks,
    isLoading,
    // error,
    employeeInputFields,
    getTeams,
    getTasks,
    createNewEmployee,
    removeEmployee,
  } = useEmployees()
  const { setIsOpen } = useContext(IsOpenModalContext)

  const handleGetTeamById = async (id: number) => {
    await getTeams(id)
    setIsOpen({
      base: true,
      edit: false,
    })
  }

  const handleGetTaskById = async (id: number) => {
    await getTasks(id)
    setIsOpen({
      base: true,
      edit: false,
    })
  }

  const handleCreateEmployee = async (values: IInitialValue) => {
    await createNewEmployee(values)
  }

  const handleDeleteEmployee = async (id: number) => {
    await removeEmployee(id)
  }

  if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={employeeInputFields}
          onSubmit={handleCreateEmployee}
          ValidationSchema={EmployeeValidSchema}
        />
        <div className='grid grid-cols-3 gap-5 w-full'>
          {employees.length ? (
            employees.map(employee => (
              <div key={employee.id}>
                <EmployeeContainer
                  employee={employee}
                  getTeamById={handleGetTeamById}
                  getTaskById={handleGetTaskById}
                  deleteEmployee={handleDeleteEmployee}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No employees found :(</h2>
          )}
        </div>
        <BaseModal>
          {team !== null && (
            <TeamContainer
              team={team}
              withBtn={false}
            />
          )}
          {tasks !== null && (
            <div className='grid grid-cols-3 gap-5'>
              {tasks.map(task => (
                <div key={task.id}>
                  <TaskContainer
                    task={task}
                    withBtn={false}
                  />
                </div>
              ))}
            </div>
          )}
        </BaseModal>
      </div>
    </Layout>
  )
}

export default Employee
