import produitsRepo from '../../produits/database/produitsRepo.js'
import produitForTest from '../../produits/testkit/produitForTest.js'
import { db } from '../../testDatabase/testDatabase.js'
import commandeForTest from '../testkit/commandeForTest.js'
import commandesRepo from './commandesRepo.js'

describe('The commandes database', () => {

  const testCommande = commandeForTest()
  delete testCommande.id

  const testProduit = produitForTest()

  let repo
  let produitRepo
  beforeEach(async () => {
    repo = commandesRepo(db)
    produitRepo = produitsRepo(db)
  })

  it('adds and gets a commande', async () => {
    await produitRepo.addProduit(testProduit)
    const produits = await produitRepo.getProduits()

    testCommande.produit_id = parseInt(produits[0].id)
    await repo.addCommande(testCommande)

    const returnedCommande = (await repo.getCommandes())[0]
    delete returnedCommande.id

    expect(returnedCommande).toMatchObject(testCommande)
  })
})
