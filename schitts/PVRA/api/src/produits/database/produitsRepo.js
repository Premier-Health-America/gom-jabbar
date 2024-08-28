const produitsRepo = (db) => {

  const addProduit = (produit) => {
    return db.query(`INSERT INTO produits(nom, prix, flair, dernier_reapprovisionnement, duree_conservation)
                     VALUES ($1, $2, $3, $4, $5)`, [produit.nom, produit.prix, produit.flair, produit.dernier_reapprovisionnement, produit.duree_conservation])
  }

  const getProduits = () => {
    return db.query(`SELECT *
                     FROM produits`)
      .then(res => res.rows)
  }

  const updateProduit = async (p) => {
    return db.query(`UPDATE produits
                     set nom                         = $1,
                         prix                        = $2,
                         flair                       = $3,
                         dernier_reapprovisionnement = $4,
                         duree_conservation          = $5
                     WHERE id = $6`, [p.nom, p.prix, p.flair, p.dernier_reapprovisionnement, p.duree_conservation, p.id])
  }

  return {
    addProduit,
    getProduits,
    updateProduit
  }
}

export default produitsRepo
