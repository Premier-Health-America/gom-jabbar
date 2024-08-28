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

  it('adds and gets retours', async () => {
    await produitRepo.addProduit(produitForTest())
    await clientRepo.addClient(clientForTest())

    const testClientsInDB = await clientRepo.getClients()
    const testProduitsInDB = await produitRepo.getProduits()

    const testRetour = retourForTest({ client_id: testClientsInDB[0].id, produit_id: testProduitsInDB[0].id })
    delete testRetour.id

    await repo.addRetour(testRetour)

    const returnedRetour = (await repo.getRetours())[0]
    delete returnedRetour.id

    expect(returnedRetour).toMatchObject(testRetour)
  })
})
