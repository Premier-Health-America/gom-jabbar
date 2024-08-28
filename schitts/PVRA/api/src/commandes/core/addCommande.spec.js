import commandeForTest from '../testkit/commandeForTest.js'
import commandesRepoForTest from '../testkit/commandesRepoForTest.js'
import addCommande from './addCommande.js'

describe('Adds a commande', () => {
  it('adds a commande', () => {
    const repo = commandesRepoForTest()
    const commande = commandeForTest()

    addCommande(repo)(commande)

    expect(repo.getCommandes()[0]).toEqual(commande)
  })
})
