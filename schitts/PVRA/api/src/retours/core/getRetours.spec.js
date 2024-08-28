import retourForTest from '../testkit/retourForTest.js'
import retoursRepoForTest from '../testkit/retoursRepoForTest.js'
import addRetour from './addRetour.js'
import getRetours from './getRetours.js'

describe('Gets all retours', () => {
  it('gets all retours', () => {
    const repo = retoursRepoForTest()
    const retour = retourForTest()

    addRetour(repo)(retour)

    expect(getRetours(repo)()[0].id).toEqual(retour.id)
  })
})
