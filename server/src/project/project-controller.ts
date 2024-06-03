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

export const createProject = async (req, res) => {
  // Начало транзакции
  const transaction = await sequelize.transaction()
  try {
    const {
      name,
      description,
      client_name,
      client_surname,
      date_end,
      phone,
      email,
      team_id,
    } = req.body

    // Создание нового проекта
    const [projectResult] = await sequelize.query(
      `INSERT INTO project (name, description, date_start, date_end) VALUES (:name, :description, CURRENT_DATE, :date_end) RETURNING id`,
      {
        replacements: { name, description, date_end },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    // Получение ID только что созданного проекта
    const projectId = projectResult[0].id

    // Создание нового клиента
    const [clientResult] = await sequelize.query(
      `INSERT INTO client (name, surname, phone, email) VALUES (:client_name, :client_surname, :phone, :email) RETURNING id`,
      {
        replacements: { client_name, client_surname, phone, email },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    // Получение ID только что созданного клиента
    const clientId = clientResult[0].id

    // Соединение проекта и клиента в таблице project_client
    await sequelize.query(
      `INSERT INTO project_client (project_id, client_id) VALUES (:project_id, :client_id)`,
      {
        replacements: { project_id: projectId, client_id: clientId },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    // Соединение проекта с существующей командой в таблице project_team
    await sequelize.query(
      `INSERT INTO project_team (project_id, team_id) VALUES (:project_id, :team_id)`,
      {
        replacements: { project_id: projectId, team_id },
        type: QueryTypes.INSERT,
        transaction,
      }
    )

    await transaction.commit() // Подтверждение транзакции

    res.status(201).json({
      project: {
        id: projectId,
        name,
        description,
        date_start: new Date().toISOString(),
      },
      client: { id: clientId, client_name, client_surname, phone, email },
    })
  } catch (error) {
    await transaction.rollback() // Откат транзакции при ошибке
    console.error('Error creating project with client and team:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateProject = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const {
      name,
      description,
      date_end,
      client_name,
      client_surname,
      phone,
      email,
      team_id,
    } = req.body

    const projectId = req.params.id

    await sequelize.query(
      `UPDATE project SET name = :name, description = :description, date_end = :date_end WHERE id = :projectId`,
      {
        replacements: { name, description, date_end, projectId },
        type: QueryTypes.UPDATE,
        transaction,
      }
    )

    const clientIdResults: { id: number }[] = await sequelize.query(
      `SELECT client.id
      FROM client 
      JOIN project_client ON project_client.client_id = client.id  
      WHERE project_client.project_id = ${projectId}`,
      {
        replacements: { projectId },
        type: QueryTypes.SELECT,
        transaction,
      }
    )

    const clientId = clientIdResults[0].id

    await sequelize.query(
      `UPDATE client SET name = :client_name, surname = :client_surname, phone = :phone, email = :email WHERE id = :clientId`,
      {
        replacements: {
          client_name,
          client_surname,
          phone,
          email,
          clientId,
        },
        type: QueryTypes.UPDATE,
        transaction,
      }
    )

    if (team_id) {
      await sequelize.query(
        `DELETE FROM project_team WHERE project_id = :projectId`,
        {
          replacements: { projectId },
          type: QueryTypes.DELETE,
          transaction,
        }
      )

      await sequelize.query(
        `INSERT INTO project_team (project_id, team_id) VALUES (:projectId, :team_id)`,
        {
          replacements: { projectId, team_id },
          type: QueryTypes.INSERT,
          transaction,
        }
      )
    }

    await transaction.commit()

    res.status(200).json({
      message: 'Project updated successfully',
      project: {
        id: projectId,
        name,
        description,
        date_end,
      },
      client: {
        id: clientId,
        name: client_name,
        surname: client_surname,
        phone,
        email,
      },
    })
  } catch (error) {
    await transaction.rollback()
    console.error('Error updating project with client and team:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteProject = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const projectId = req.params.id

    await sequelize.query(
      `DELETE FROM project_team WHERE project_id = :projectId`,
      {
        replacements: { projectId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    await sequelize.query(
      `DELETE FROM project_client WHERE project_id = :projectId`,
      {
        replacements: { projectId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )

    const result = await sequelize.query(
      `DELETE FROM project WHERE id = :projectId`,
      {
        replacements: { projectId },
        type: QueryTypes.DELETE,
        transaction,
      }
    )
    //Тут также выполняется триггер для удаления всех клиентов, не связанных с project_client

    if (result[0] === 0) {
      await transaction.rollback()
      return res.status(404).json({ error: 'Project not found' })
    }

    await transaction.commit()
    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    await transaction.rollback()
    console.error('Error deleting project:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const increaseDueDate = async (req, res) => {
  const { projectId, daysToAdd } = req.body

  try {
    const result = await sequelize.query(
      `CALL increase_due_date(:projectId, :daysToAdd)`,
      {
        replacements: { projectId, daysToAdd },
        type: QueryTypes.RAW,
      }
    )

    res.status(200).json({ message: 'Due date increased successfully' })
  } catch (error) {
    console.error('Error calling stored procedure:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
