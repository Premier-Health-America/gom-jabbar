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

  let repo
  let produitRepo
  let clientRepo
  beforeEach(async () => {
    repo = commandesRepo(db)
    produitRepo = produitsRepo(db)
    clientRepo = clientsRepo(db)
  })

  it('adds and gets a commande with client and produit as text', async () => {
    // Pas mal de code dupliqué
    const produitRepo = produitsRepo(db)
    const clientRepo = clientsRepo(db)

    const testProduit = produitForTest()
    delete testProduit.id

    const testClient = clientForTest()
    delete testClient.id

    await produitRepo.addProduit(testProduit)
    await clientRepo.addClient(testClient)


    const returnedProduits = await produitRepo.getProduits()
    const returnedClients = await clientRepo.getClients()

    const testCommande = commandeForTest({produit_id: returnedProduits[0].id, client_id: returnedClients[0].id})
    delete testCommande.id

    await repo.addCommande(testCommande)

    const returnedCommande = (await repo.getCommandes())[0]

    const expectedCommande = testCommande
    expectedCommande.nom_produit = testProduit.nom
    expectedCommande.nom_client = testClient.nom
    delete expectedCommande.produit_id
    delete expectedCommande.client_id

    // Douteux
    expect(returnedCommande.id).toBeTruthy()
    expectedCommande.id = returnedCommande.id

    expect(returnedCommande).toEqual(expectedCommande)
  })
})
