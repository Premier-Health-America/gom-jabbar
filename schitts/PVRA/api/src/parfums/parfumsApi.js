import getParfums from './core/getParfums.js'
import parfumsRepo from './database/parfumsRepo.js'

const parfumsApi = (app, db) => {

  app.get('/parfums', async (req, res) => {
    const parfumRepo = parfumsRepo(db)

    return getParfums(parfumRepo)()
      .then(parfums => res.status(200).json(parfums))
      .catch(err => {
        res.status(500).json({ error: err })
        console.log(err)
      })
  })
}

export default parfumsApi
