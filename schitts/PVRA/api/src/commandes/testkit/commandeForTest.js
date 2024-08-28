const commandeForTest = (c = {}) => (
  {
    id: c.id || Math.trunc(Math.random() * 1000),
    produit_id: c.produit_id || 1,
    date: c.nom || new Date(2024, 12, 25),
    humeur: c.humeur || 1,
    nombre_clients: c.nombre_clients || 1,
    repartition_addition: c.repartition_addition || 1
  }
)

export default commandeForTest
