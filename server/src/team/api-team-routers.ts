import express from 'express'
import { getTeams } from './team-controller'

const router = express.Router()

router.get('/teams', getTeams)

export default router
