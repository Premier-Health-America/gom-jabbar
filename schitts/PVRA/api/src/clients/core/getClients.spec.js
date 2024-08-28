import clientForTest from '../testkit/clientForTest.js'
import clientsRepoForTest from '../testkit/clientsRepoForTest.js'
import addClient from './addClient.js'
import getClients from './getClients.js'

describe('Gets all clients', () => {
  it('gets all clients', () => {
    const repo = clientsRepoForTest()
    const client = clientForTest()

    addClient(repo)(client)

    expect(getClients(repo)()[0].id).toEqual(client.id)
  })
})
