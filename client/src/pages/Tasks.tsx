import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import TaskContainer from '../components/containers/TaskContainer'
import { useTasks } from '../hooks/useTasks'
import { IsOpenModalContext } from '../providers/modalProvider'
import { useContext } from 'react'
import * as Yup from 'yup'

const TasksValidSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(256, 'Too Long!')
    .required('Required'),
  project_id: Yup.string().required('Required'),
  employee_id: Yup.string().required('Required'),
})

export interface ITask {
  id: number
  description: string
  status: string
  date_start: number
  date_end: number
  project_id: number
}

const Tasks = () => {
  const { setIsOpen } = useContext(IsOpenModalContext)
  const {
    tasks,
    project,
    employee,
    isLoading,
    // error,
    taskInputFields,
    getProject,
    getEmployee,
    createNewTask,
    removeTask,
  } = useTasks()

  const handleGetProjectById = async (id: number) => {
    await getProject(id)
    setIsOpen({
      base: true,
      edit: false,
    })
  }

  const handleGetEmployeeById = async (id: number) => {
    await getEmployee(id)
    setIsOpen({
      base: true,
      edit: false,
    })
  }

  const handleCreateTask = async (values: IInitialValue) => {
    await createNewTask(values)
  }

  const handleDeleteTask = async (id: number) => {
    await removeTask(id)
  }

  if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={taskInputFields}
          onSubmit={handleCreateTask}
          ValidationSchema={TasksValidSchema}
        />
        <div className='grid grid-cols-3 gap-5 w-full'>
          {tasks.length ? (
            tasks.map(task => (
              <div key={task.id}>
                <TaskContainer
                  task={task}
                  getProjectById={handleGetProjectById}
                  getEmployeeById={handleGetEmployeeById}
                  deleteTask={handleDeleteTask}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No tasks found :(</h2>
          )}
        </div>
      </div>
      <BaseModal>
        {project !== null && (
          <ProjectContainer
            project={project}
            withBtn={false}
          />
        )}
        {employee !== null && (
          <EmployeeContainer
            employee={employee}
            withBtn={false}
          />
        )}
      </BaseModal>
    </Layout>
  )
}

export default Tasks
