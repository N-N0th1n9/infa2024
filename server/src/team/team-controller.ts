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

export const getTeamByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const employee = await sequelize.query(
      `SELECT team.*
      FROM team
      JOIN employee ON team.id = employee.team_id
      WHERE employee.id = ${employeeId}`,
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
