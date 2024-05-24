import express from 'express'
import { getTaskByEmployeeId, getTasks } from './task-controller'

const router = express.Router()

router.get('/tasks', getTasks)
router.get('/tasks/:employeeId', getTaskByEmployeeId)

export default router
