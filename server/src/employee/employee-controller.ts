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
