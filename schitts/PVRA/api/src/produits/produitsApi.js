import addProduit from './core/addProduit.js'
import getProduits from './core/getProduits.js'
import updateProduit from './core/updateProduit.js'
import produitsRepo from './database/produitsRepo.js'

const produitsApi = (app, db) => {

  app.get('/produits', async (req, res) => {
    const produitRepo = produitsRepo(db)

    return getProduits(produitRepo)()
      .then(produits => res.status(200).json(produits))
      .catch(err => {
        res.status(500).json({ error: err })
        console.log(err)
      })
  })

  app.post('/produits', async (req, res) => {
    const produitRepo = produitsRepo(db)

    return addProduit(produitRepo)(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        res.sendStatus(400)
        console.log(err)
      })
  })

  app.put('/produits', async (req, res) => {
    const produitRepo = produitsRepo(db)

    return updateProduit(produitRepo)(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        res.sendStatus(400)
        console.log(err)
      })
  })

}

export default produitsApi
