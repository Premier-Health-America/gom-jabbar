const commandesRepoForTest = () => {
  const commandes = []

  const addCommande = (c) => {
    commandes.push(c)
  }

  const getCommandes = () => {
    return commandes
  }

  return { addCommande, getCommandes }
}

export default commandesRepoForTest
