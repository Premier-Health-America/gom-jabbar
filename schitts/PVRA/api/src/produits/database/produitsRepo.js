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

  return {
    addProduit,
    getProduits
  }
}

export default produitsRepo
