import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
import ClientContainer from '../components/containers/ClientContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import { useProjects } from '../hooks/useProjects'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IFormFields } from '../types/formFields'
import { IClient } from './Clients'
import { useCallback, useContext } from 'react'
import * as Yup from 'yup'

const ProjectValidSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  description: Yup.string().min(2, 'Too Short!').max(256, 'Too Long!'),
  client_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  client_surname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .required('Required')
    .matches(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/, 'Invalid phone number'),
  email: Yup.string().email('Invalid email').required('Required'),
  team_id: Yup.string().required('Required'),
})

const increaseFields: IFormFields[] = [
  {
    name: 'project_id',
    type: 'text',
    label: 'Project Id*',
  },
  {
    name: 'dayToAdd',
    type: 'text',
    label: 'day to add*',
  },
]

const increaseValidSchema = Yup.object().shape({
  project_id: Yup.number().required('Required'),
  dayToAdd: Yup.number().required('Required'),
})

export interface IProject {
  id: number
  name: string
  description: string
  date_start: number
  date_end: number
}

type IProjectWithoutId = Omit<IProject, 'id'>
type IClientWithoutId = Omit<IClient, 'id'>

export interface ICreateProjectFields extends IProjectWithoutId, IClientWithoutId {
  team_id: string
}

const Projects = () => {
  const {
    projects,
    client,
    isLoading,
    projectInputFields,
    editFields,
    getClient,
    createNewProject,
    removeProject,
    editProject,
    fieldsEditProject,
    increaseDueDate,
  } = useProjects()
  const { isOpen, setIsOpen } = useContext(IsOpenModalContext)

  const handleGetClientById = async (id: number) => {
    await getClient(id)
    setIsOpen({
      base: true,
      edit: false,
    })
  }

  const handleEditProject = async (values: IInitialValue) => {
    await editProject(values)
  }

  const handleFieldsEditProject = useCallback(
    async (id: number) => {
      await fieldsEditProject(id)
      setIsOpen({ base: false, edit: true })
    },
    [fieldsEditProject, setIsOpen]
  )

  if (isLoading) return <div>Loading...</div>

  return (
    <Layout>
      <div className='flex gap-5'>
        <div className='flex flex-col gap-10'>
          <MyForm
            fields={projectInputFields}
            onSubmit={createNewProject}
            ValidationSchema={ProjectValidSchema}
          />
          <MyForm
            fields={increaseFields}
            onSubmit={increaseDueDate}
            ValidationSchema={increaseValidSchema}
          />
        </div>

        <div className='grid grid-cols-3 gap-5 w-full'>
          {projects.length ? (
            projects.map(project => (
              <div key={project.id}>
                <ProjectContainer
                  project={project}
                  getClientById={handleGetClientById}
                  deleteProject={removeProject}
                  handleEditProject={handleFieldsEditProject}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No projects found :(</h2>
          )}
        </div>
        {isOpen.base ? (
          <BaseModal>
            {client === null ? (
              ''
            ) : (
              <ClientContainer
                client={client}
                withBtn={false}
              />
            )}
          </BaseModal>
        ) : (
          <BaseModal>
            <div className='bg-white p-4 rounded-md'>
              <h3 className='flex justify-center mb-3 text-lg'> Editor </h3>
              <MyForm
                fields={projectInputFields}
                onSubmit={handleEditProject}
                ValidationSchema={ProjectValidSchema}
                editFields={editFields}
              />
            </div>
          </BaseModal>
        )}
      </div>
    </Layout>
  )
}

export default Projects
