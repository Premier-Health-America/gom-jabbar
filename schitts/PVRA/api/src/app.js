import express from 'express'
import clientsApi from './clients/clientsApi.js'
import commandesApi from './commandes/commandesApi.js'
import database from './database/database.js'
import produitsApi from './produits/produitsApi.js'
import retoursApi from './retours/retoursApi.js'

const app = express()
const port = 8080

app.use(express.json());

const db = database

clientsApi(app, db)
commandesApi(app)
produitsApi(app, db)
retoursApi(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
