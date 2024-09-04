const clientsRepo = (db) => {

  const addClient = (client) => {
    return db.query(`INSERT INTO clients(nom, type, parfum_prefere_id, produit_prefere_id)
                     VALUES ($1, $2, $3, $4)`, [client.nom, client.type, client.parfum_prefere_id, client.produit_prefere_id])
  }

  const getClients = () => {
    return db.query(`SELECT clients.id, clients.nom, clients.type, parfums.nom AS parfum_prefere, produits.nom AS produit_prefere
                     FROM clients
                              LEFT JOIN parfums
                                   ON clients.parfum_prefere_id = parfums.id
                              LEFT JOIN produits
                                   ON clients.produit_prefere_id = produits.id;`)
      .then(res => res.rows)
  }

  return {
    addClient,
    getClients
  }
}

export default clientsRepo
