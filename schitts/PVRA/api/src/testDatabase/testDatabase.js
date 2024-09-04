import pg from 'pg'

let db

beforeAll(async () => {
  db = new pg.Client({
    user: 'test',
    host: 'localhost',
    database: 'rose',
    password: 'test',
    port: 5432
  })

  db.connect(function (err) {
    if (err) throw err
  })
})

beforeEach(async () => {
  await db.query('BEGIN')
})

afterEach(async () => {
  await db.query('ROLLBACK')
})

afterAll(async () => {
  await db?.end()
})

export { db }
