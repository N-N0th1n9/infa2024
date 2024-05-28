import express from 'express'
import {
  createTask,
  deleteTask,
  getTaskByEmployeeId,
  getTasks,
} from './task-controller'

const router = express.Router()

router.get('/tasks', getTasks)
router.get('/tasks/:employeeId', getTaskByEmployeeId)
router.post('/task/create', createTask)
router.delete('/task/delete/:id', deleteTask)

export default router
