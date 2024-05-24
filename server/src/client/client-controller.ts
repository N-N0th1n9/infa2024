import { QueryTypes } from 'sequelize'
import sequelize from '../../server'

export const getAllClients = async (req, res) => {
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

export const getClientByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId
    const client = await sequelize.query(
      `SELECT client.* 
      FROM client 
      JOIN project_client ON project_client.client_id = client.id  
      WHERE project_client.project_id = ${projectId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(client)
  } catch (error) {
    console.error('Error fetching client by id:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
