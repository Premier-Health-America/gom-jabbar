import AddIcon from '@mui/icons-material/Add.js'
import { Box, Button, Grid2, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProduitBox from './components/ProduitBox.jsx'

function Produits () {
  useEffect(() => {
    axios.get('http://localhost:8080/produits').then(r => {
      setProduits(r.data)
    })
  }, [])

  const [produits, setProduits] = useState([])
  const navigate = useNavigate()

  return (
    <Box sx={{ height: '90vh' }}>
      <Grid2 container spacing={2}>
        <Button variant={'contained'} color={'info'} onClick={() => navigate('/')}>Retour</Button>
        <IconButton onClick={() => navigate('/ajouter-produit')}><AddIcon /></IconButton>
      </Grid2>
      <Grid2 container direction={'column'}>
        <ProduitBox nom={'Nom'} prix={'Prix'} flair={'Flair'} dernier_reapprovisionnement={'Dernier réapprovisionnement'} duree_conservation={'Durée conservation'} />
        {produits.length !== 0 && produits.map((produit) => (<ProduitBox key={produit.id} id={produit.id} nom={produit.nom} prix={produit.prix} flair={produit.flair} dernier_reapprovisionnement={produit.dernier_reapprovisionnement} duree_conservation={produit.duree_conservation + ' jours'} />))}
        {produits.length === 0 && <Box>Aucun produit</Box>}
      </Grid2>
    </Box>
  )
}

export default Produits
