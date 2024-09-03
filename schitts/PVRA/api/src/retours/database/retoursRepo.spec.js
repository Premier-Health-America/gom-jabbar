import clientsRepo from '../../clients/database/clientsRepo.js'
import clientForTest from '../../clients/testkit/clientForTest.js'
import produitsRepo from '../../produits/database/produitsRepo.js'
import produitForTest from '../../produits/testkit/produitForTest.js'
import { db } from '../../testDatabase/testDatabase.js'
import retourForTest from '../testkit/retourForTest.js'
import retoursRepo from './retoursRepo.js'

describe('The retours database', () => {
  let repo
  let clientRepo
  let produitRepo
  beforeEach(async () => {
    repo = retoursRepo(db)
    clientRepo = clientsRepo(db)
    produitRepo = produitsRepo(db)
  })

  it('adds and gets a retour with client and produit as text', async () => {
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

    const testRetour = retourForTest({ produit_id: returnedProduits[0].id, client_id: returnedClients[0].id })
    delete testRetour.id

    await repo.addRetour(testRetour)

    const returnedRetour = (await repo.getRetours())[0]

    const expectedCommande = testRetour
    expectedCommande.nom_produit = testProduit.nom
    expectedCommande.nom_client = testClient.nom
    delete expectedCommande.produit_id
    delete expectedCommande.client_id

    // Douteux
    expect(returnedRetour.id).toBeTruthy()
    expectedCommande.id = returnedRetour.id

    expect(returnedRetour).toEqual(expectedCommande)
  })
})
