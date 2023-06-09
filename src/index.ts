import cors from 'cors'
import path from 'path'
import express from 'express'
// import mongoose from 'mongoose'
import { PORT, isProd, FRONTEND_DIR_NAME } from './config'
import router from './router'
import mongoService from './services/MongoService'

const app = express()

app.use(cors())
app.use(express.json())

if (isProd()) {
  app.use(
    express.static(path.join(__dirname, `../../${FRONTEND_DIR_NAME}/dist`))
  )
}

app.use('/api/v1', router)

if (isProd()) {
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, `../../${FRONTEND_DIR_NAME}/dist/index.html`)
    )
  })
}

const startApp = async () => {
  try {
    const isConnected = await mongoService.connect('mongodb://localhost:27017')
    if (isConnected) {
      console.log('MongoDB OK')
    } else {
      console.error('MongoDB error')
    }
    app.listen(PORT, () => {
      console.log(`server started: http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error(e)
    process.exit()
  }
}

process.on('SIGINT', () => {
  process.exit()
})

startApp()
