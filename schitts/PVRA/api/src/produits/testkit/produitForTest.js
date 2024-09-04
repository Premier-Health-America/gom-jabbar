const produitForTest = (p = {}) => (
  {
    id: p.id || Math.trunc(Math.random() * 1000),
    nom: p.nom || 'Eau de toilette',
    prix: p.prix || 12.99,
    flair: p.flair || 7,
    dernier_reapprovisionnement: p.restock || new Date(2024, 12, 25),
    duree_conservation: p.conservation || 5
  }
)

export default produitForTest
