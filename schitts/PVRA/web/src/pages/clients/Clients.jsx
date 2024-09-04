import { Box, Button, Grid2, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientBox from './components/ClientBox.jsx'
import AddIcon from '@mui/icons-material/Add'

function Clients () {
  const [clients, setClients] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8080/clients').then(r => {
      setClients(r.data)
    })
  }, [])

  return (
    <Box sx={{ height: '90vh' }}>
      <Grid2 container spacing={2}>
        <Button variant={'contained'} color={'info'} onClick={() => navigate('/')}>Retour</Button>
        <IconButton onClick={() => navigate('/ajouter-client')}><AddIcon /></IconButton>
      </Grid2>
      <Grid2 container direction={'column'}>
        <ClientBox nom={'Nom'} type={0} parfum={'Parfum préféré'} produit={'Produit préféré'}/>
        {clients.length !== 0 && clients.map((client) => (<ClientBox key={client.id} nom={client.nom} type={client.type} parfum={client.parfum_prefere} produit={client.produit_prefere} />))}
        {clients.length === 0 && <Box>Aucun client</Box>}
      </Grid2>
    </Box>
  )
}

export default Clients
