import clientForTest from '../testkit/clientForTest.js'
import clientsRepoForTest from '../testkit/clientsRepoForTest.js'
import addClient from './addClient.js'
import getClients from './getClients.js'

describe('Adds a client', () => {
  it('adds a client', () => {
    const repo = clientsRepoForTest()
    const client = clientForTest()

    addClient(repo)(client)

    expect(getClients(repo)()[0]).toEqual(client)
  })
})
