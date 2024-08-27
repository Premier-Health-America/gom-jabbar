import produitForTest from '../testkit/produitForTest.js'
import produitsRepoForTest from '../testkit/produitsRepoForTest.js'
import addProduit from './addProduit.js'

describe('Adds a produit', () => {
  it('adds a produit and returns it with id', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()

    const returnedProduit = addProduit(repo)(produit)

    expect(returnedProduit.id).toEqual(produit.id)
  })
})
