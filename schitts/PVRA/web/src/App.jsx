import { Grid2 } from '@mui/material'
import React from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import MainButton from './components/buttons/MainButton.jsx'

function App () {
  const navigate = useNavigate()

  return (
    <>
      <Grid2 container spacing={12}>
        <Grid2 container direction={'column'} rowSpacing={6}>
          <MainButton onClick={() => navigate('/ajouter-client')}>Ajouter un client</MainButton>
          <MainButton onClick={() => navigate('/clients')}>Voir les clients</MainButton>
        </Grid2>
        <Grid2 container direction={'column'} rowSpacing={6}>
          <MainButton onClick={() => navigate('/ajouter-commande')}>Créer une commande</MainButton>
          <MainButton onClick={() => navigate('/commandes')}>Voir les commandes</MainButton>
        </Grid2>
        <Grid2 container direction={'column'} rowSpacing={6}>
          <MainButton onClick={() => navigate('/ajouter-produit')}>Ajouter un produit</MainButton>
          <MainButton onClick={() => navigate('/produits')}>Voir les produits</MainButton>
          <MainButton onClick={() => navigate('/modifier-produit')}>Modifier un produit</MainButton>
        </Grid2>
      </Grid2>
    </>
  )
}

export default App
