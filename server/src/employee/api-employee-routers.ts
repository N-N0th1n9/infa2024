import express from 'express'
import { getEmployeeByTaskId, getEmployees } from './employee-controller'

const router = express.Router()

router.get('/employees', getEmployees)
router.get('/employees/task/:taskId', getEmployeeByTaskId)

export default router
