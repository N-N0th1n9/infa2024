import express from 'express'
import {
  createEmployee,
  deleteEmployee,
  getEmployeeByTaskId,
  getEmployees,
  getEmployeesByTeamId,
} from './employee-controller'

const router = express.Router()

router.get('/employees', getEmployees)
router.get('/employees/task/:taskId', getEmployeeByTaskId)
router.get('/employees/team/:teamId', getEmployeesByTeamId)
router.post('/employee/create', createEmployee)
router.delete('/employee/delete/:id', deleteEmployee)

export default router
