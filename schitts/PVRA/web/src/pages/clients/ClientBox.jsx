import { Box, Grid2, Paper } from '@mui/material'

const ClientBox = ({ nom, type, parfum, produit }) => {
  const typeIdToString = (id) => {
    const types = ['Type', 'Hors ville', 'En ville', 'Membre de la famille']
    return types[id]
  }

  return <>
    <Paper
      elevation={3}
      sx={{
        width: '900px',
        marginY: '10px'
      }}
    >
      <Grid2 container justifyContent={'space-around'} direction={'row'} sx={{ backgroundColor: '#eeeeee' }}>
        <Box
          sx={{ height: '3em', width: '25%', alignContent: 'center' }}>
          {nom}
        </Box>
        <Box
          sx={{ height: '3em', width: '25%', alignContent: 'center' }}>
          {typeIdToString(type)}
        </Box>
        <Box
          sx={{ height: '3em', width: '25%', alignContent: 'center' }}>
          {parfum ? parfum : 'Aucun'}
        </Box>
        <Box
          sx={{ height: '3em', width: '25%', alignContent: 'center' }}>
          {produit ? produit : 'Aucun'}
        </Box>
      </Grid2>
    </Paper>
  </>
}
export default ClientBox
