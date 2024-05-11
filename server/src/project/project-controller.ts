import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getProjects = async (req, res) => {
  try {
    const projects = await sequelize.query('SELECT * FROM project', {
      type: QueryTypes.SELECT,
    })
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
