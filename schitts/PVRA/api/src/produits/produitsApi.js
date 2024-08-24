const produitsApi = (app) => {
  app.get('/produits', async (req, res) => {
    res.send('all produits')
  })
}

export default produitsApi
