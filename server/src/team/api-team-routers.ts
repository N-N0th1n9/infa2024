import express from 'express'
import {
  createTeam,
  deleteTeam,
  getTeamByEmployeeId,
  getTeams,
} from './team-controller'

const router = express.Router()

router.get('/teams', getTeams)
router.get('/team/:employeeId', getTeamByEmployeeId)
router.post('/team/create', createTeam)
router.delete('/team/delete/:id', deleteTeam)

export default router
