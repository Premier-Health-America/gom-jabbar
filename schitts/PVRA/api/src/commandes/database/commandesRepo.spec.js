import clientsRepo from '../../clients/database/clientsRepo.js'
import clientForTest from '../../clients/testkit/clientForTest.js'
import produitsRepo from '../../produits/database/produitsRepo.js'
import produitForTest from '../../produits/testkit/produitForTest.js'
import { db } from '../../testDatabase/testDatabase.js'
import commandeForTest from '../testkit/commandeForTest.js'
import commandesRepo from './commandesRepo.js'

describe('The commandes database', () => {

  const testCommande = commandeForTest()
  delete testCommande.id

  const testProduit = produitForTest()

  const testClient = clientForTest()

  let repo
  let produitRepo
  let clientRepo
  beforeEach(async () => {
    repo = commandesRepo(db)
    produitRepo = produitsRepo(db)
    clientRepo = clientsRepo(db)
  })

  it('adds and gets a commande', async () => {
    await produitRepo.addProduit(testProduit)
    const produits = await produitRepo.getProduits()

    await clientRepo.addClient(testClient)
    const clients = await clientRepo.getClients()

    testCommande.produit_id = parseInt(produits[0].id)
    testCommande.client_id = parseInt(clients[0].id)
    await repo.addCommande(testCommande)

    const returnedCommande = (await repo.getCommandes())[0]
    delete returnedCommande.id

    expect(returnedCommande).toMatchObject(testCommande)
  })
})
