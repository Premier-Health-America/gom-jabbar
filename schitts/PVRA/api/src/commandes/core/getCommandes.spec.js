import commandeForTest from '../testkit/commandeForTest.js'
import commandesRepoForTest from '../testkit/commandesRepoForTest.js'
import addCommande from './addCommande.js'
import getCommandes from './getCommandes.js'

describe('Gets all commandes', () => {
  it('gets all commandes', () => {
    const repo = commandesRepoForTest()
    const commande = commandeForTest()

    addCommande(repo)(commande)

    expect(getCommandes(repo)()[0].id).toEqual(commande.id)
  })
})
