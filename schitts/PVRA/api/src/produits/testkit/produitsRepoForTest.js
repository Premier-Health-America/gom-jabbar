const produitsRepoForTest = () => {
  const produits = []

  const addProduit = (p) => {
    produits.push(p)
    return p
  }

  const getProduits = () => {
    return produits
  }

  const updateProduit = (p) => {
    const i = produits.findIndex(prod => prod.id = p.id)
    if (i !== -1){
      produits[i] = p
    }
  }

  return { addProduit, getProduits, updateProduit }
}

export default produitsRepoForTest
