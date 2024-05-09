import express from 'express'
import { getClients } from './client-controller'

const router = express.Router()

router.get('/client', getClients)

export default router
