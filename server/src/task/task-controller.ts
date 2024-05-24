import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getTasks = async (req, res) => {
  try {
    const tasks = await sequelize.query('SELECT * FROM task', {
      type: QueryTypes.SELECT,
    })
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getTaskByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const employee = await sequelize.query(
      `SELECT task.*
      FROM task
      JOIN task_employee ON task_employee.task_id = task.id
      WHERE task_employee.employee_id = ${employeeId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(employee)
  } catch (error) {
    console.error('Error fetching employees:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
