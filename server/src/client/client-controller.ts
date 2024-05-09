import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getClients = async (req, res) => {
  try {
    const client = await sequelize.query('SELECT * FROM client', {
      type: QueryTypes.SELECT,
    })
    res.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
