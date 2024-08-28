import produitForTest from '../testkit/produitForTest.js'
import produitsRepoForTest from '../testkit/produitsRepoForTest.js'
import addProduit from './addProduit.js'
import getProduits from './getProduits.js'

describe('Gets all produits', () => {
  it('gets all produits', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()

    addProduit(repo)(produit)

    expect(getProduits(repo)()[0].id).toEqual(produit.id)
  })
})
