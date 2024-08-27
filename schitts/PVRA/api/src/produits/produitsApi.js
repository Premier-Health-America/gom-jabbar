import addProduit from './core/addProduit.js'
import produitsRepo from './database/produitsRepo.js'

const produitsApi = (app, db) => {

  app.get('/produits', async (req, res) => {
    res.send('all produits')
  })

  app.post('/produits', async (req, res) => {
    const produitRepo = produitsRepo(db)

    const produit = addProduit(produitRepo)(req.body)

    res.send(produit)
  })
}

export default produitsApi
