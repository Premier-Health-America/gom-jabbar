const retoursApi = (app) => {
  app.get('/retours', async (req, res) => {
    res.send('all retours')
  })
}

export default retoursApi
