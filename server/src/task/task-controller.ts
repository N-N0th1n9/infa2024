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
