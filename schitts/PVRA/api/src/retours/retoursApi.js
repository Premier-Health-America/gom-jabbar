import addRetour from './core/addRetour.js'
import getRetours from './core/getRetours.js'
import retoursRepo from './database/retoursRepo.js'

const retoursApi = (app, db) => {
  app.get('/retours', async (req, res) => {
    const retourRepo = retoursRepo(db)

    return getRetours(retourRepo)()
      .then(retours => res.status(200).json(retours))
      .catch(err => {
        res.status(500).json({ error: err })
        console.log(err)
      })
  })

  app.post('/retours', async (req, res) => {
    const retourRepo = retoursRepo(db)

    return addRetour(retourRepo)(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        res.sendStatus(400)
        console.log(err)
      })
  })
}

export default retoursApi
