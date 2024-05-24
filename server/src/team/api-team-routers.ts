import express from 'express'
import { createTeam, getTeamByEmployeeId, getTeams } from './team-controller'

const router = express.Router()

router.get('/teams', getTeams)
router.get('/team/:employeeId', getTeamByEmployeeId)
router.post('/team/create', createTeam)

export default router
