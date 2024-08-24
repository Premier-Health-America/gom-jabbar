const commandesApi = (app) => {
  app.get('/commandes', async (req, res) => {
    res.send('all commandes')
  })
}

export default commandesApi
