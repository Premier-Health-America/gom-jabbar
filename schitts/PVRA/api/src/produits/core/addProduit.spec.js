import produitForTest from '../testkit/produitForTest.js'
import produitsRepoForTest from '../testkit/produitsRepoForTest.js'
import addProduit from './addProduit.js'

describe('Adds a produit', () => {
  it('adds a produit', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()

    addProduit(repo)(produit)

    expect(repo.getProduits()[0].id).toEqual(produit.id)
  })

  it('does not add a produit when flair is not within requisite values', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()
    produit.flair = 15

    expect.assertions(1)
    return addProduit(repo)(produit).catch(error => expect(error.message).toMatch('Flair must be within range: 1-10'))
  })
})
