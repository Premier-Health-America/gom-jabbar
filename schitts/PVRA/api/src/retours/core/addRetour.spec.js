import retourForTest from '../testkit/retourForTest.js'
import retoursRepoForTest from '../testkit/retoursRepoForTest.js'
import addRetour from './addRetour.js'

describe('Adds a retour', () => {
  it('adds a retour', () => {
    const repo = retoursRepoForTest()
    const retour = retourForTest()

    addRetour(repo)(retour)

    const retours = repo.getRetours()
    expect(retours[0].id).toEqual(retour.id)
  })
})
