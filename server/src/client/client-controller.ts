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

export const deleteClient = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const clientId = req.params.id

    await sequelize.query(
      `DELETE FROM project_team WHERE project_id IN (
        SELECT project_id FROM project_client WHERE client_id = :clientId
      )`,
      {
        replacements: { clientId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    await sequelize.query(
      `DELETE FROM project_client WHERE client_id = :clientId`,
      {
        replacements: { clientId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    const result = await sequelize.query(
      `DELETE FROM client WHERE id = :clientId`,
      {
        replacements: { clientId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    if (result[0] === 0) {
      await transaction.rollback()
      return res.status(404).json({ error: 'Client not found' })
    }

    await transaction.commit()
    res.status(200).json({ message: 'Client deleted successfully' })
  } catch (error) {
    await transaction.rollback()
    console.error('Error deleting client:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
