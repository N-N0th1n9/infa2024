import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getEmployees = async (req, res) => {
  try {
    const employees = await sequelize.query('SELECT * FROM employee', {
      type: QueryTypes.SELECT,
    })
    res.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getEmployeeByTaskId = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const employee = await sequelize.query(
      `SELECT employee.* 
      FROM employee 
      JOIN task_employee ON task_employee.employee_id = employee.id  
      WHERE task_employee.task_id = ${taskId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(employee)
  } catch (error) {
    console.error('Error fetching employee by id:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getEmployeesByTeamId = async (req, res) => {
  try {
    const teamId = req.params.teamId
    const employees = await sequelize.query(
      `SELECT employee.*
      FROM employee
      JOIN team ON team.id = employee.team_id
      WHERE team.id = ${teamId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createEmployee = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { name, surname, position, skills, team_id } = req.body

    const arraySkills = skills.split(' ')

    const [employeeResult] = await sequelize.query(
      `INSERT INTO employee (name, surname, position, skills, team_id) VALUES (:name, :surname, :position, ARRAY[:arraySkills], :team_id) RETURNING id`,
      {
        replacements: { name, surname, position, arraySkills, team_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    const employeeId = employeeResult[0].id

    await transaction.commit()

    res.status(201).json({
      employee: {
        id: employeeId,
        name,
        surname,
        position,
        skills: arraySkills,
        team_id,
      },
    })
  } catch (error) {
    await transaction.rollback()
    console.error('Error creating employee:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
