import { db } from '../../testDatabase/testDatabase.js'
import parfumForTest from '../testkit/parfumForTest.js'
import parfumsRepo from './parfumsRepo.js'

describe('The parfums database', () => {

  const testParfum = parfumForTest()
  delete testParfum.id

  let repo
  beforeEach(async () => {
    repo = parfumsRepo(db)
  })

  it('adds and gets parfum', async () => {
    await repo.addParfum(testParfum)

    const returnedParfum = (await repo.getParfums())[0]
    delete returnedParfum.id

    expect(returnedParfum).toMatchObject(testParfum)
  })
})
