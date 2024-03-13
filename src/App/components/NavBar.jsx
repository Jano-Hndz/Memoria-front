import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuthStore } from "../../hooks/useAuthStore";
import { AppBar, Container,Toolbar,Typography,useTheme,Button} from '@mui/material';
import MyriadProBold from '../../fonts/MyriadProBold.ttf'
import MyriadProSemiExtended from '../../fonts/MyriadProSemiExtended.otf'

import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoInformatica from '../../images/informatica.png';

export const NavBar = ({ drawerWidth = 0 }) =>{
  const theme = useTheme();
  const { startLogout, user } = useAuthStore();
  const navigate = useNavigate();


return (
  <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Box display='flex' px={2}>
          <Button
            onClick={() => navigate("/")}
            sx={{color: 'white' }}
            startIcon={<img src={LogoInformatica} alt="Icon" style={{width: '80px', marginRight: '8px', marginTop:"0" }} />}
          >
            <Box display={{ xs: 'none', sm: 'flex' }} flexDirection="column" alignItems="center" justifyContent="center" ml={-1}>
              <Typography fontFamily={MyriadProBold} variant="button" fontSize={12} fontWeight="bold">
                DEPARTAMENTO DE INFORMATICA
              </Typography>
              <Typography fontFamily={MyriadProSemiExtended} fontSize={12} style={{ textTransform: 'none' }}>
                Universidad Técnica Federico Santa María
              </Typography>
            </Box>

          </Button>

          <Button
    onClick={startLogout}
    sx={{ color: 'white',  marginLeft: 'auto'}}
>
    <Typography variant="button" fontSize={16} marginRight={1} >
        Cerrar sesión
    </Typography>
    <ExitToAppIcon />
</Button>
        </Box>

      </Container>
    </AppBar>
  </>
)
}