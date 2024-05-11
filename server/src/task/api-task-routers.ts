import express from 'express'
import { getTasks } from './task-controller'

const router = express.Router()

router.get('/tasks', getTasks)

export default router
