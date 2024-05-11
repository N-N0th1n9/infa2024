import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getClients = async (req, res) => {
  try {
    const clients = await sequelize.query('SELECT * FROM client', {
      type: QueryTypes.SELECT,
    })
    res.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
