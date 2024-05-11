import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getTeams = async (req, res) => {
  try {
    const teams = await sequelize.query('SELECT * FROM team', {
      type: QueryTypes.SELECT,
    })
    res.json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
