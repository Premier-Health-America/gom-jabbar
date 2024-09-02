import express from 'express'
import clientsApi from './clients/clientsApi.js'
import commandesApi from './commandes/commandesApi.js'
import database from './database/database.js'
import parfumsApi from './parfums/parfumsApi.js'
import produitsApi from './produits/produitsApi.js'
import retoursApi from './retours/retoursApi.js'

const app = express()
const port = 8080

app.use(express.json());

const db = database(process.env.DB_HOST)

clientsApi(app, db)
commandesApi(app, db)
produitsApi(app, db)
retoursApi(app, db)
parfumsApi(app, db)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
