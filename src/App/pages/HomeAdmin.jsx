import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { AppLayout } from '../layout/AppLayout';

import { useNavigate } from 'react-router-dom';



export const HomeAdmin = () => {
  const navigate = useNavigate();
  

  return (
    <AppLayout>
      
      <Box mt={6} display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
        <Box width={{ xs: '100%', md: '50%' }} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
          <Box width={'60%'} my={6}>
            <Button
              fullWidth
              variant='contained'
              onClick={()=>{navigate('/admin/AdminUsers')}}
              sx={{ mt: 1, height: '80px' }}
            >
              <Typography color='white' fontSize={22}>Admin Usuarios</Typography>
            </Button>
          </Box>

          <Box width={'60%'} mb={6}>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 1, height: '80px' }}
            >
              <Typography color='white' fontSize={22}>Boton 3</Typography>
            </Button>
          </Box>

          <Box width={'60%'} mb={6}>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 1, height: '80px' }}
            >
              <Typography color='white' fontSize={22}>Boton 5</Typography>
            </Button>
          </Box>
        </Box>

        {/* Segunda columna */}
        <Box width={{ xs: '100%', md: '50%' }} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
          <Box width={'60%'} mb={6}>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 1, height: '80px' }}
            >
              <Typography color='white' fontSize={22}>REVISAR PETICIONES</Typography>
            </Button>
          </Box>

          <Box width={'60%'} mb={6}>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 1, height: '80px' }}
            >
              <Typography color='white' fontSize={22}>Boton 4</Typography>
            </Button>
          </Box>

          <Box width={'60%'}>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 1, height: '80px' }}
            >
              <Typography color='white' fontSize={22}>Boton 6</Typography>
            </Button>
          </Box>
        </Box>
      </Box>


    </AppLayout>
  )
}