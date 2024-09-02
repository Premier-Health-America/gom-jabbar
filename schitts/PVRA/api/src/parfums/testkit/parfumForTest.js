const parfumForTest = (p = {}) => (
  {
    id: p.id || Math.trunc(Math.random() * 1000),
    nom: p.nom || 'Eau de Schitt\'s creek',
  }
)

export default parfumForTest
