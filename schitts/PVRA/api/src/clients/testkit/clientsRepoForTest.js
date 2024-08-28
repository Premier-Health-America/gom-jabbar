const clientsRepoForTest = () => {
  const clients = []

  const addClient = (c) => {
    clients.push(c)
  }

  const getClients = () => {
    return clients
  }

  return { addClient, getClients }
}

export default clientsRepoForTest
