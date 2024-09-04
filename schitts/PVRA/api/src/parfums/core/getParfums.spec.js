import parfumForTest from '../testkit/parfumForTest.js'
import parfumsRepoForTest from '../testkit/parfumsRepoForTest.js'
import getParfums from './getParfums.js'

describe('Gets all parfums', () => {
  it('gets all parfums', () => {
    const repo = parfumsRepoForTest()
    const parfum = parfumForTest()
    delete parfum.id

    repo.addParfum(parfum)

    expect(getParfums(repo)()[0].nom).toEqual(parfum.nom)
  })
})
