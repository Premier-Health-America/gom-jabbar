const retoursRepo = (db) => {

  const addRetour = (retour) => {
    return db.query(`INSERT INTO retours(commentaire, client_id, produit_id)
                     VALUES ($1, $2, $3)`, [retour.commentaire, retour.client_id, retour.produit_id])
  }

  const getRetours = () => {
    return db.query(`SELECT retours.id,
       retours.commentaire,
       clients.nom AS nom_client,
       produits.nom AS nom_produit
                     FROM retours
                     LEFT JOIN  clients ON retours.client_id = clients.id
                     LEFT JOIN  produits ON retours.produit_id = produits.id`)
      .then(res => res.rows)
  }

  return {
    addRetour,
    getRetours
  }
}

export default retoursRepo
