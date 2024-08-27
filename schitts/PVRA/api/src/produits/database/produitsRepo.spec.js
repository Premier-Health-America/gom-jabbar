import { db } from '../../testDatabase/testDatabase.js'
import produitForTest from '../testkit/produitForTest.js'
import produitsRepo from './produitsRepo.js'

describe('The produits database', () => {

  const testProduit = produitForTest()
  delete testProduit.id

  let repo
  beforeEach(async () => {
    repo = produitsRepo(db)
  })

  it('adds a product', async () => {
    await repo.addProduit(testProduit)

    const returnedProduit = (await repo.getProduits())[0]
    delete returnedProduit.id

    expect(returnedProduit).toMatchObject(testProduit)
  })
})
