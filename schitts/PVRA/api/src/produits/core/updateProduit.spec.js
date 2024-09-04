import produitForTest from '../testkit/produitForTest.js'
import produitsRepoForTest from '../testkit/produitsRepoForTest.js'
import addProduit from './addProduit.js'
import getProduits from './getProduits.js'
import updateProduit from './updateProduit.js'

describe('Updates a produit', () => {
  it('updates an existing produit', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()

    addProduit(repo)(produit)

    const produitToUpdate = produitForTest({...produit, prix: produit.prix + 2})

    updateProduit(repo)(produitToUpdate)

    expect(produitToUpdate).toMatchObject(getProduits(repo)()[0])
  })

  it('cant update a produit if flair is not within requisite values', () => {
    const repo = produitsRepoForTest()
    const produit = produitForTest()
    addProduit(repo)(produit)

    const produitToUpdate = produitForTest({...produit, flair: 15})

    expect.assertions(1)
    return updateProduit(repo)(produitToUpdate).catch(error => expect(error.message).toMatch('Flair must be within range: 1-10'))
  })
})
