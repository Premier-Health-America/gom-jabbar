import pg from 'pg'

const client = new pg.Client({
  user: 'test',
  host: 'localhost',
  database: 'rose',
  password: 'test',
  port: 5432
})

client.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

export default client
