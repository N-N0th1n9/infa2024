import express from 'express'
import { getTeamByEmployeeId, getTeams } from './team-controller'

const router = express.Router()

router.get('/teams', getTeams)
router.get('/team/:employeeId', getTeamByEmployeeId)

export default router
