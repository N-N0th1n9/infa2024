import express from 'express'
import { createTask, getTaskByEmployeeId, getTasks } from './task-controller'

const router = express.Router()

router.get('/tasks', getTasks)
router.get('/tasks/:employeeId', getTaskByEmployeeId)
router.post('/task/create', createTask)

export default router
