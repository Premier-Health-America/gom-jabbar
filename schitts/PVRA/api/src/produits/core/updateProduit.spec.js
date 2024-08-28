import produitForTest from '../testkit/produitForTest.js'
import produitsRepoForTest from '../testkit/produitsRepoForTest.js'
import addProduit from './addProduit.js'

describe('Updates a produit', () => {
  it('updates an existing produit', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()

    addProduit(repo)(produit)

    const produitToUpdate = produitForTest({...produit, prix: produit.prix + 2})
    repo.updateProduit(produitToUpdate)

    expect(produitToUpdate).toMatchObject(repo.getProduits()[0])
  })
})
