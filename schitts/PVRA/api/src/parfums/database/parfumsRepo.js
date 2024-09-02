const parfumsRepo = (db) => {

  const addParfum = (parfum) => {
    return db.query(`INSERT INTO parfums(nom)
                     VALUES ($1)`, [parfum.nom])
  }

  const getParfums = () => {
    return db.query(`SELECT *
                     FROM parfums`)
      .then(res => res.rows)
  }

  return { addParfum, getParfums }
}

export default parfumsRepo
