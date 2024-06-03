import express from 'express'
import {
  createTeam,
  deleteTeam,
  getTeamByEmployeeId,
  getTeamByProjectId,
  getTeams,
} from './team-controller'

const router = express.Router()

router.get('/teams', getTeams)
router.get('/team/:employeeId', getTeamByEmployeeId)
router.get('/team/:projectId', getTeamByProjectId)
router.post('/team/create', createTeam)
router.delete('/team/delete/:id', deleteTeam)

export default router
