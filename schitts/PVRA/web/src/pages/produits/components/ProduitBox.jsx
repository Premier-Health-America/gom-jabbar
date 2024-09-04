import { Box, Grid2, IconButton, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

const ProduitBox = ({ id, nom, prix, flair, dernier_reapprovisionnement, duree_conservation }) => {
  const navigate = useNavigate()

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
          sx={{ height: '3em', width: '18%', alignContent: 'center' }}>
          {nom}
        </Box>
        <Box
          sx={{ height: '3em', width: '18%', alignContent: 'center' }}>
          {prix}
        </Box>
        <Box
          sx={{ height: '3em', width: '18%', alignContent: 'center' }}>
          {flair}
        </Box>
        <Box
          sx={{ height: '3em', width: '18%', alignContent: 'center' }}>
          {isNaN(new Date(dernier_reapprovisionnement).getTime()) ? 'Dernier réapprovisionnement' : new Date(dernier_reapprovisionnement).toLocaleDateString('fr-CA')}
        </Box>
        <Box
          sx={{ height: '3em', width: '18%', alignContent: 'center' }}>
          {duree_conservation}
        </Box>
        <Box
          sx={{ height: '3em', width: '10%', alignContent: 'center' }}
        >
          {id && <IconButton
            onClick={() => {navigate(`modifier/${id}`)}}
          >
            <EditIcon />
          </IconButton>}
        </Box>
      </Grid2>
    </Paper>
  </>
}
export default ProduitBox
