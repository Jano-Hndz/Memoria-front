import React, { useRef } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
  Grid,
  Alert,
  Link
} from '@mui/material';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../layout/AppLayout';
import { useForm,useAuthStore } from '../../../hooks';

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
  }


export const AddUser = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();


    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );
    
    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
    
    }
    
    
  
    return (
    <AppLayout>

            <Box  display="flex" alignItems="center" justifyContent="center"
            >

                <Typography variant='h2' fontWeight={500} mt={4} >
                    Crear Cuenta
                </Typography>
            </Box>

            <Box  display="flex" alignItems="center" justifyContent="center">                
                <Box mt={1} width={{ xs: '90%', md: '60%' }} >
                <form onSubmit={ registerSubmit } className='animate__animated animate__fadeIn animate__faster'>
                    <Grid container>
                    
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre completo" 
                            type="text" 
                            placeholder='Nombre completo' 
                            fullWidth
                            name="registerName"
                            value={ registerName }
                            onChange={ onRegisterInputChange }
                        />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo" 
                            type="email" 
                            placeholder='correo@google.com' 
                            fullWidth
                            name="registerEmail"
                            value={ registerEmail }
                            onChange={ onRegisterInputChange }
                        />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            placeholder='Contraseña' 
                            fullWidth
                            name="registerPassword"
                            value={ registerPassword }
                            onChange={ onRegisterInputChange }
                        />
                        </Grid>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            placeholder='Contraseña' 
                            fullWidth
                            name="registerPassword2"
                            value={ registerPassword2 }
                            onChange={ onRegisterInputChange }
                        />
                        </Grid>
                        
                        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        
                        <Grid 
                            item 
                            xs={ 12 }
                            display={ !!errorMessage ? '': 'none' }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Button 
                            type="submit"
                            variant='contained' 
                            style={{backgroundColor: "#944eb3"}}
                            fullWidth>
                            Crear cuenta
                            </Button>
                        </Grid>
                        </Grid>


                    </Grid>


                    </form>
                </Box>
            </Box>

    </AppLayout>
    );
  }
  