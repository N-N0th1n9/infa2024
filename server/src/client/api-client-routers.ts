import express from 'express'
import { getProjectByTaskId } from '../project/project-controller'
import {
  deleteClient,
  getAllClients,
  getClientByProjectId,
} from './client-controller'

const router = express.Router()

router.get('/clients', getAllClients)
router.get('/client/project/:projectId', getClientByProjectId)
router.get('/client/task/:taskId', getProjectByTaskId)
router.delete('/client/delete/:id', deleteClient)

export default router
