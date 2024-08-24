const clientsApi = (app) => {
  app.get('/clients', async (req, res) => {
    res.send('all clients')
  })
}

export default clientsApi
