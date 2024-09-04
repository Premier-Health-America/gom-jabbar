const clientForTest = (c = {}) => (
  {
    id: c.id || Math.trunc(Math.random() * 1000),
    nom: c.nom || 'Steve',
    type: c.type || 1,
    parfum_prefere_id: c.parfum_prefere_id || null,
    produit_prefere_id: c.produit_prefere_id || null
  }
)

export default clientForTest
