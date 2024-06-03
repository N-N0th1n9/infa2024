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

export const getTeamByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId
    const team = await sequelize.query(
      `SELECT team.* 
      FROM team 
      JOIN project_team ON project_team.team_id = team.id  
      WHERE project_team.projectId = ${projectId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createTeam = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { role, teamlead_id, project_id } = req.body

    const [teamResult] = await sequelize.query(
      `INSERT INTO team (role, teamlead_id) VALUES (:role, :teamlead_id) RETURNING id`,
      {
        replacements: { role, teamlead_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    const team_id = teamResult[0].id

    await sequelize.query(
      `INSERT INTO project_team (team_id, project_id) VALUES (:team_id, :project_id)`,
      {
        replacements: { team_id, project_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    await sequelize.query(
      `UPDATE team SET teamlead_id = NULL WHERE teamlead_id = :teamlead_id AND id != :team_id`,
      {
        replacements: { teamlead_id, team_id },
        type: QueryTypes.UPDATE,
        transaction,
      }
    )

    await sequelize.query(
      `UPDATE employee SET team_id = :team_id WHERE id = :teamlead_id`,
      {
        replacements: { team_id, teamlead_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    await transaction.commit()

    res.status(201).json({
      team: {
        id: team_id,
        role,
        teamlead_id,
      },
    })
  } catch (error) {
    await transaction.rollback()
    console.error('Error creating team:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteTeam = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const teamId = req.params.id

    await sequelize.query(`DELETE FROM project_team WHERE team_id = :teamId`, {
      replacements: { teamId },
      type: QueryTypes.DELETE,
      transaction,
    })

    await sequelize.query(
      `UPDATE employee 
      SET team_id = NULL
      WHERE team_id IN (
        SELECT team_id FROM employee WHERE team_id = :teamId
      )`,
      {
        replacements: { teamId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    const result = await sequelize.query(
      `DELETE FROM team WHERE id = :teamId`,
      {
        replacements: { teamId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    if (result[0] === 0) {
      await transaction.rollback()
      return res.status(404).json({ error: 'Team not found' })
    }

    await transaction.commit()
    res.status(200).json({ message: 'Team deleted successfully' })
  } catch (error) {
    await transaction.rollback()
    console.error('Error deleting team:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
