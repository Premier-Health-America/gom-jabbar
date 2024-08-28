const retourForTest = (r = {}) => (
  {
    id: r.id || Math.trunc(Math.random() * 1000),
    commentaire: r.commentaire || 'Très bien',
    client_id: r.client_id || 1,
    produit_id: r.produit_id || 1
  }
)

export default retourForTest
