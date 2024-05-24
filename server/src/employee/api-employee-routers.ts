import express from 'express'
import {
  createEmployee,
  getEmployeeByTaskId,
  getEmployees,
  getEmployeesByTeamId,
} from './employee-controller'

const router = express.Router()

router.get('/employees', getEmployees)
router.get('/employees/task/:taskId', getEmployeeByTaskId)
router.get('/employees/team/:teamId', getEmployeesByTeamId)
router.post('/employee/create', createEmployee)

export default router
