const retoursRepo = (db) => {

  const addRetour = (retour) => {
    return db.query(`INSERT INTO retours(commentaire, client_id, produit_id)
                     VALUES ($1, $2, $3)`, [retour.commentaire, retour.client_id, retour.produit_id])
  }

  const getRetours = () => {
    return db.query(`SELECT *
                     FROM retours`)
      .then(res => res.rows)
  }

  return {
    addRetour,
    getRetours
  }
}

export default retoursRepo
