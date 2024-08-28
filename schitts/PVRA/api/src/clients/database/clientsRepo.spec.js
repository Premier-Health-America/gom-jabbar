import { db } from '../../testDatabase/testDatabase.js'
import clientForTest from '../testkit/clientForTest.js'
import clientsRepo from './clientsRepo.js'

describe('The clients database', () => {
  const testClient = clientForTest()
  delete testClient.id

  let repo
  beforeEach(async () => {
    repo = clientsRepo(db)
  })

  it('adds and gets a client', async () => {
    await repo.addClient(testClient)

    const returnedClient = (await repo.getClients())[0]
    delete returnedClient.id

    expect(returnedClient).toMatchObject(testClient)
  })
})
