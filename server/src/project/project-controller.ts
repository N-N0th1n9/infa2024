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

export const getProjectByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId
    const project = await sequelize.query(
      `SELECT project.* 
      FROM project 
      JOIN project_client ON project_client.project_id = project.id  
      WHERE project_client.client_id = ${clientId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(project)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getProjectByTeamId = async (req, res) => {
  try {
    const teamId = req.params.teamId
    const project = await sequelize.query(
      `SELECT project.* 
      FROM project 
      JOIN project_team ON project_team.project_id = project.id  
      WHERE project_team.team_id = ${teamId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(project)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getProjectByTaskId = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const project = await sequelize.query(
      `SELECT project.*
      FROM project 
      JOIN task ON project.id = task.project_id  
      WHERE task.id = ${taskId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    res.json(project)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
