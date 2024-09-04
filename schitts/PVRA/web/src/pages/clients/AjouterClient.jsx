import { Alert, Box, Button, FormControl, Grid2, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterClient = () => {
  const navigate = useNavigate()

  const [nom, setNom] = useState('')
  const [type, setType] = useState(1)

  const [produit, setProduit] = useState(0)
  const [produits, setProduits] = useState()

  const [parfum, setParfum] = useState(0)
  const [parfums, setParfums] = useState()

  const [nomError, setNomError] = useState(false)

  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState()
  const [snackbarMessage, setSnackbarMessage] = useState()

  useEffect(() => {
    axios.get('http://localhost:8080/produits').then(res => {
      setProduits(res.data)
    })

    axios.get('http://localhost:8080/parfums').then(res => {
      setParfums(res.data)
    })
  }, [])

  const handleNomChange = (e) => {
    setNom(e.target.value)
  }

  const handleTypeChange = (e) => {
    setType(e.target.value)
  }

  const handleProduitChange = (e) => {
    setProduit(e.target.value)
  }

  const handleParfumChange = (e) => {
    setParfum(e.target.value)
  }

  const handleAjouter = () => {
    if (nom === '') setNomError(true)
    else {
      setNomError(false)
      const body = {
        nom: nom,
        type: type,
        parfum_prefere_id: parfum === 0 ? null : parfum,
        produit_prefere_id: produit === 0 ? null : produit
      }
      axios.post('http://localhost:8080/clients', body).then(() => {
        setSnackbarSeverity('success')
        setShowSnackbar(true)
        setSnackbarMessage('Client ajouté')
      }).catch(err => {
        setSnackbarSeverity('error')
        setShowSnackbar(true)
        setSnackbarMessage('Erreur')
        console.log(err)
      })
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowSnackbar(false)
  }

  return <>
    <Box sx={{ height: '90vh' }}>
      <Grid2 container>
        <Button variant={'contained'} color={'info'} onClick={() => navigate('/')}>Retour</Button>
      </Grid2>
      <Box sx={{ paddingY: '3em', width: '60vw' }}>
        <Grid2 container direction='column' spacing={3} sx={{ alignItems: 'center' }}>
          <Box>
            <Typography variant='h4'>Ajouter un client</Typography>
          </Box>
          <Box>
            <TextField sx={{ width: 250 }} id='nom-client' label='Nom' variant='outlined' onChange={handleNomChange} error={nomError} />
          </Box>
          <Box sx={{ width: 250 }}>
            <FormControl fullWidth>
              <InputLabel id='type-client'>Type</InputLabel>
              <Select
                value={type}
                label='Type'
                onChange={handleTypeChange}
              >
                <MenuItem value={1}>En ville</MenuItem>
                <MenuItem value={2}>Hors ville</MenuItem>
                <MenuItem value={3}>Membre de la famille</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 250 }}>
            <FormControl fullWidth>
              <InputLabel id='produit-prefere'>Produit préféré</InputLabel>
              <Select
                value={produit}
                label='Produit préféré'
                onChange={handleProduitChange}
              >
                <MenuItem value={0}>{'Aucun'}</MenuItem>
                {produits && produits.map((produit) => (<MenuItem value={produit.id} key={produit.id}>{produit.nom}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 250 }}>
            <FormControl fullWidth>
              <InputLabel id='produit-prefere'>Parfum préféré</InputLabel>
              <Select
                value={parfum}
                label='Parfum préféré'
                onChange={handleParfumChange}
              >
                <MenuItem value={0}>{'Aucun'}</MenuItem>
                {parfums && parfums.map((parfum) => (<MenuItem value={parfum.id} key={parfum.id}>{parfum.nom}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button variant={'contained'} color={'info'} onClick={() => handleAjouter()}>Ajouter</Button>
          </Box>
        </Grid2>
      </Box>
    </Box>
    <Snackbar open={showSnackbar} onClose={handleSnackbarClose} autoHideDuration={6000}>
      <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </>
}
export default AjouterClient
