import express from 'express'
import { getProjects } from './project-controller'

const router = express.Router()

router.get('/projects', getProjects)

export default router
