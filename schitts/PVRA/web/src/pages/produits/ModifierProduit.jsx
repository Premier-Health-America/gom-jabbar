import { Alert, Box, Button, FormControl, Grid2, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ModifierProduit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [nom, setNom] = useState('')
  const [prix, setPrix] = useState('')
  const [flair, setFlair] = useState('1')
  const [dateReapprovisionnement, setDateReapprovisionnement] = useState(dayjs())
  const [conservation, setConservation] = useState('')

  const [produit, setProduit] = useState()

  const [nomError, setNomError] = useState(false)
  const [prixError, setPrixError] = useState(false)
  const [conservationError, setConservationError] = useState(false)

  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState()
  const [snackbarMessage, setSnackbarMessage] = useState()

  useEffect(() => {
    axios.get('http://localhost:8080/produits').then((res) => {
      const p = res.data.find(produit => produit.id === id)
      setProduit(p)
      setNom(p.nom)
      setPrix(p.prix)
      setFlair(p.flair)
      setDateReapprovisionnement(dayjs(p.dernier_reapprovisionnement))
      setConservation(p.duree_conservation)
    }).catch(() => {
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      setSnackbarMessage('Erreur')
    })
  }, [])

  const handleNomChange = (e) => {
    setNom(e.target.value)
  }

  const handlePrixChange = (e) => {
    setPrix(e.target.value)
  }

  const handleFlairChange = (e) => {
    setFlair(e.target.value)
  }

  const handleConservationChange = (e) => {
    setConservation(e.target.value)
  }

  const handleAjouter = () => {
    // useState pas updaté instantanément
    let localNomError
    let localPrixError
    let localConservationError

    if (nom === '') {
      setNomError(true)
      localNomError = true
    } else {
      setNomError(false)
      localNomError = false
    }

    if (prix === '') {
      setPrixError(true)
      localPrixError = true
    } else {
      setPrixError(false)
      localPrixError = false
    }

    if (conservation === '') {
      setConservationError(true)
      localConservationError = true
    } else {
      setConservationError(false)
      localConservationError = false
    }

    if (!localNomError && !localPrixError && !localConservationError) {
      const body = {
        id: id,
        nom: nom,
        prix: prix,
        flair: flair,
        dernier_reapprovisionnement: dateReapprovisionnement.toISOString().split('T')[0],
        duree_conservation: conservation
      }

      axios.put('http://localhost:8080/produits', body).then(() => {
        setSnackbarSeverity('success')
        setShowSnackbar(true)
        setSnackbarMessage('Produit modifié')
      }).catch(() => {
        setSnackbarSeverity('error')
        setShowSnackbar(true)
        setSnackbarMessage('Erreur')
      })
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowSnackbar(false)
  }

  const flairMenuItems = () => {
    let items = []
    for (let i = 1; i <= 10; i++) {
      items.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return items
  }

  return produit && <>
    <Box sx={{ height: '90vh' }}>
      <Grid2 container>
        <Button variant={'contained'} color={'info'} onClick={() => navigate('/')}>Retour</Button>
      </Grid2>
      <Box sx={{ paddingY: '3em', width: '60vw' }}>
        <Grid2 container direction='column' spacing={3} sx={{ alignItems: 'center' }}>
          <Box>
            <Typography variant='h4'>Modifier un produit</Typography>
          </Box>
          <Box>
            <TextField sx={{ width: 250 }} id='nom-produit' label='Nom' variant='outlined' onChange={handleNomChange} error={nomError} defaultValue={produit.nom} />
          </Box>
          <Box>
            <TextField sx={{ width: 250 }} id='prix-produit' label='Prix ($)' variant='outlined' onChange={handlePrixChange} error={prixError} defaultValue={produit.prix} />
          </Box>
          <Box sx={{ width: 250 }}>
            <FormControl fullWidth>
              <InputLabel id='flair-produit'>Flair</InputLabel>
              <Select
                value={flair}
                label='Flair'
                onChange={handleFlairChange}
                defaultValue={produit.flair}
              >
                {flairMenuItems()}
              </Select>
            </FormControl>
          </Box>
          <Box x={{ width: 250 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Dernier réapprovisionnement'
                value={dateReapprovisionnement}
                onChange={(newDate) => setDateReapprovisionnement(newDate)}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <TextField sx={{ width: 250 }} id='produit-conservation' label='Durée conservation (jours)' variant='outlined' onChange={handleConservationChange} error={conservationError} defaultValue={produit.duree_conservation} />
          </Box>
          <Box>
            <Button variant={'contained'} color={'info'} onClick={() => handleAjouter()}>Confirmer</Button>
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

export default ModifierProduit
