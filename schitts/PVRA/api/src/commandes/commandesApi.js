import addCommande from './core/addCommande.js'
import getCommandes from './core/getCommandes.js'
import commandesRepo from './database/commandesRepo.js'

const commandesApi = (app, db) => {
  app.get('/commandes', async (req, res) => {
    const commandeRepo = commandesRepo(db)

    return getCommandes(commandeRepo)()
      .then(commandes => res.status(200).json(commandes))
      .catch(err => {
        res.status(500).json({ error: err })
        console.log(err)
      })
  })

  app.post('/commandes', async (req, res) => {
    const commandeRepo = commandesRepo(db)

    return addCommande(commandeRepo)(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        res.sendStatus(400)
        console.log(err)
      })
  })
}

export default commandesApi
