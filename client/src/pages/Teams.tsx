import BaseModal from '../components/UI/BaseModal'
import MyForm, { IInitialValue } from '../components/UI/MyForm'
import EmployeeContainer from '../components/containers/EmployeeContainer'
import Layout from '../components/containers/Layout'
import ProjectContainer from '../components/containers/ProjectContainer'
import TeamContainer from '../components/containers/TeamContainer'
import { useTeams } from '../hooks/useTeams'
import { IsOpenModalContext } from '../providers/modalProvider'
import { IEmployee } from './Employees'
import { IProject } from './Projects'
import { useContext } from 'react'
import * as Yup from 'yup'

const TeamValidSchema = Yup.object().shape({
  role: Yup.string().required('Required'),
  teamlead_id: Yup.string().required('Required'),
  project_id: Yup.string().required('Required'),
})

export interface ITeam {
  id: number
  teamlead_id: string
  role: string
}

const Teams = () => {
  const {
    teams,
    projects,
    employees,
    isLoading,
    // error,
    teamInputFields,
    getProject,
    getEmployee,
    createNewTeam,
    removeTeam,
  } = useTeams()
  const { setIsOpen } = useContext(IsOpenModalContext)

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

  const handleCreateTeam = async (values: IInitialValue) => {
    await createNewTeam(values)
  }

  const handleDeleteTeam = async (id: number) => {
    await removeTeam(id)
  }

  if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className='flex gap-5'>
        <MyForm
          fields={teamInputFields}
          onSubmit={handleCreateTeam}
          ValidationSchema={TeamValidSchema}
        />
        <div className='flex flex-col gap-5 w-full'>
          {teams.length ? (
            teams.map(team => (
              <div key={team.id}>
                <TeamContainer
                  team={team}
                  getProjectById={handleGetProjectById}
                  getEmployeesById={handleGetEmployeeById}
                  deleteTeam={handleDeleteTeam}
                />
              </div>
            ))
          ) : (
            <h2 className='mx-auto'>No teams found :(</h2>
          )}
        </div>
      </div>
      <BaseModal>
        <div className='grid grid-cols-3 gap-5'>
          {projects !== null &&
            projects.map((project: IProject) => (
              <div key={project.id}>
                <ProjectContainer
                  project={project}
                  withBtn={false}
                />
              </div>
            ))}
          {employees !== null &&
            employees.map((employee: IEmployee) => (
              <div key={employee.id}>
                <EmployeeContainer
                  employee={employee}
                  withBtn={false}
                />
              </div>
            ))}
        </div>
      </BaseModal>
    </Layout>
  )
}

export default Teams
