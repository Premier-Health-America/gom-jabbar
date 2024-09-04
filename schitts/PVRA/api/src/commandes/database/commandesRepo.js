const commandesRepo = (db) => {

  const addCommande = (commande) => {
    return db.query(`INSERT INTO commandes(date, produit_id, client_id, humeur, nombre_clients, repartition_addition)
                     VALUES ($1, $2, $3, $4, $5, $6)`, [commande.date, commande.produit_id, commande.client_id, commande.humeur, commande.nombre_clients, commande.repartition_addition])
  }

  const getCommandes = () => {
    return db.query(`SELECT commandes.id,
                            commandes.date,
                            commandes.humeur,
                            commandes.nombre_clients,
                            commandes.repartition_addition,
                            produits.nom AS nom_produit,
                            clients.nom  AS nom_client
                     FROM commandes
                              LEFT JOIN produits ON commandes.produit_id = produits.id
                              LEFT JOIN clients ON commandes.client_id = clients.id`)
      .then(res => res.rows)
  }

  return {
    addCommande,
    getCommandes,
  }
}

export default commandesRepo
