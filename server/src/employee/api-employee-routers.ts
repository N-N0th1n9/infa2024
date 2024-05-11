import express from 'express'
import { getEmployees } from './employee-controller'

const router = express.Router()

router.get('/employees', getEmployees)

export default router
