import express from 'express'
import { Sequelize } from 'sequelize'

import clientRouter from './src/client/api-client-routers'

const app = express()
const PORT = 3000

app.use(express.json())

app.use(clientRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('pypypy:(')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//TODO: Сменить на env

const sequelize = new Sequelize('IT_company_projects', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
})

export default sequelize
