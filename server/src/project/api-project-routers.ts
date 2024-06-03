import express from 'express'
import {
  createProject,
  deleteProject,
  getProjectByClientId,
  getProjectByTaskId,
  getProjectByTeamId,
  getProjects,
  increaseDueDate,
  updateProject,
} from './project-controller'

const router = express.Router()

router.get('/projects', getProjects)
router.get('/project/client/:clientId', getProjectByClientId)
router.get('/project/team/:teamId', getProjectByTeamId)
router.get('/project/task/:taskId', getProjectByTaskId)
router.post('/project/create', createProject)
router.post('/project/increaseDueDate', increaseDueDate)
router.delete('/project/delete/:id', deleteProject)
router.put('/project/update/:id', updateProject)

export default router
