import { db } from '../../testDatabase/testDatabase.js'
import addProduit from '../core/addProduit.js'
import getProduits from '../core/getProduits.js'
import updateProduit from '../core/updateProduit.js'
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
    await addProduit(repo)(testProduit)

    const returnedProduit = (await getProduits(repo)())[0]
    delete returnedProduit.id

    expect(returnedProduit).toMatchObject(testProduit)
  })

  it('adds and modifies a product', async () => {
    await addProduit(repo)(testProduit)

    const returnedProduit = (await getProduits(repo)())[0]
    const updatedProduit = {...returnedProduit, prix: returnedProduit.prix + 2}

    await updateProduit(repo)(updatedProduit)
    const updatedProduits = await getProduits(repo)()

    expect(updatedProduits[0]).toMatchObject(updatedProduit)
  })
})
