import { Button } from '@mui/material'

const MainButton = ({ onClick, children }) => {

  return <>
    <Button
      color={'info'}
      variant={'contained'}
      onClick={onClick}
      sx={{
        paddingX: '3em',
        paddingY: '2em'
      }}>
      {children}
    </Button>
  </>
}
export default MainButton
