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

export const createTask = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { description, project_id, employee_id } = req.body

    const [taskResult] = await sequelize.query(
      `INSERT INTO task (description, project_id, status, date_start) VALUES (:description, :project_id, 'Not fulfilled', CURRENT_DATE) RETURNING id`,
      {
        replacements: { description, project_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    const task_id = taskResult[0].id

    await sequelize.query(
      `INSERT INTO task_employee (task_id, employee_id) VALUES (:task_id, :employee_id)`,
      {
        replacements: { task_id, employee_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    await transaction.commit()

    res.status(201).json({
      task: {
        id: task_id,
        description,
        project_id,
        status: 'Not fulfilled',
        date_start: new Date().toISOString(),
      },
    })
  } catch (error) {
    await transaction.rollback()
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteTask = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const taskId = req.params.id

    await sequelize.query(`DELETE FROM task_employee WHERE task_id = :taskId`, {
      replacements: { taskId },
      type: QueryTypes.DELETE,
      transaction,
    })

    const result = await sequelize.query(
      `DELETE FROM task WHERE id = :taskId`,
      {
        replacements: { taskId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    if (result[0] === 0) {
      await transaction.rollback()
      return res.status(404).json({ error: 'Task not found' })
    }

    await transaction.commit()
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    await transaction.rollback()
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const increaseDueDate = async (req, res) => {
  const { projectId, daysToAdd } = req.body

  try {
    const result = await sequelize.query(
      `CALL increase_due_date(:projectId, :daysToAdd)`,
      {
        replacements: { projectId, daysToAdd },
        type: QueryTypes.RAW,
      }
    )

    res.status(200).json({ message: 'Due date increased successfully' })
  } catch (error) {
    console.error('Error calling stored procedure:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
