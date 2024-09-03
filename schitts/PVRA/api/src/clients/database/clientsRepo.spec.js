import parfumsRepo from '../../parfums/database/parfumsRepo.js'
import parfumForTest from '../../parfums/testkit/parfumForTest.js'
import produitsRepo from '../../produits/database/produitsRepo.js'
import produitForTest from '../../produits/testkit/produitForTest.js'
import { db } from '../../testDatabase/testDatabase.js'
import clientForTest from '../testkit/clientForTest.js'
import clientsRepo from './clientsRepo.js'

describe('The clients database', () => {
  let repo
  beforeEach(async () => {
    repo = clientsRepo(db)
  })

  it('adds and gets a client with parfum and produit as name', async () => {
    const produitRepo = produitsRepo(db)
    const parfumRepo = parfumsRepo(db)

    const testProduit = produitForTest()
    delete testProduit.id

    const testParfum = parfumForTest()
    delete testParfum.id

    await produitRepo.addProduit(testProduit)
    await parfumRepo.addParfum(testParfum)

    const returnedProduit = await produitRepo.getProduits()
    const returnedParfums = await parfumRepo.getParfums()

    const testClient = clientForTest({ parfum_prefere_id: returnedParfums[0].id, produit_prefere_id: returnedProduit[0].id })
    delete testClient.id

    await repo.addClient(testClient)

    const returnedClient = (await repo.getClients())[0]

    const expectedClient = testClient
    expectedClient.parfum_prefere = testParfum.nom
    expectedClient.produit_prefere = testProduit.nom
    delete expectedClient.parfum_prefere_id
    delete expectedClient.produit_prefere_id

    // Douteux
    expect(returnedClient.id).toBeTruthy()
    expectedClient.id = returnedClient.id

    expect(returnedClient).toEqual(expectedClient)
  })
})
