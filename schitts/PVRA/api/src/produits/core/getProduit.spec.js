import produitForTest from '../testkit/produitForTest.js'
import produitsRepoForTest from '../testkit/produitsRepoForTest.js'
import addProduit from './addProduit.js'

describe('Gets all produits', () => {
  it('gets all produits', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()

    addProduit(repo)(produit)

    expect(repo.getProduits()[0].id).toEqual(produit.id)
  })
})
