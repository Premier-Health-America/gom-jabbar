const produitsRepoForTest = () => {
  const produits = []

  const addProduit = (p) => {
    produits.push(p)
    return p
  }

  const getProduits = () => {
    return produits
  }

  return { addProduit, getProduits }
}

export default produitsRepoForTest
