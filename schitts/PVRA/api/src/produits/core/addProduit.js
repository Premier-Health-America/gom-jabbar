const addProduit = (produitsRepo) => (produit) => produit.flair > 10 || produit.flair < 1 ? Promise.reject(new Error('Flair must be within range: 1-10')) : produitsRepo.addProduit(produit)

export default addProduit

