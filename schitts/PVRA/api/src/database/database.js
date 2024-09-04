import pg from 'pg'

const database = (host) => {
  return new pg.Pool({
    user: 'test',
    host: host,
    database: 'rose',
    password: 'test',
    port: 5432
  })
}

export default database
