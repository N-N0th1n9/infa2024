import express from 'express'
import {
  createProject,
  getProjectByClientId,
  getProjectByTaskId,
  getProjectByTeamId,
  getProjects,
} from './project-controller'

const router = express.Router()

router.get('/projects', getProjects)
router.get('/project/client/:clientId', getProjectByClientId)
router.get('/project/team/:teamId', getProjectByTeamId)
router.get('/project/task/:taskId', getProjectByTaskId)
router.post('/project/create', createProject)

export default router
