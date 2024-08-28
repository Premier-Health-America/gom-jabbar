import addClient from './core/addClient.js'
import getClients from './core/getClients.js'
import clientsRepo from './database/clientsRepo.js'

const clientsApi = (app, db) => {
  app.get('/clients', async (req, res) => {
    const clientRepo = clientsRepo(db)

    return getClients(clientRepo)()
      .then(clients => res.status(200).json(clients))
      .catch(err => {
        res.status(500).json({ error: err })
        console.log(err)
      })
  })

  app.post('/clients', async (req, res) => {
    const clientRepo = clientsRepo(db)

    return addClient(clientRepo)(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        res.sendStatus(400)
        console.log(err)
      })
  })
}

export default clientsApi
