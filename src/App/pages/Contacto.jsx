import React, { useRef } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
  Grid
} from '@mui/material';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';


export const Contacto = () => {

    const theme = useTheme();
    const form = useRef();
    const navigate = useNavigate();
  
    const sendEmail = (e) => {
      e.preventDefault();
      console.log(form.current);

      emailjs
        .sendForm(
            "service_fmkzpmy","template_0pzpa6x",
          form.current,"kbhBLoZaMKE992mD1"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      Swal.fire({
        title: 'Problema notificado',
        icon: 'success',
        text: "Espere un correo con su solución",
        confirmButtonText: 'Volver',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/auth/login');
        }
      });
    };
  
    return (
    <AppLayout>

            <Box  display="flex" alignItems="center" justifyContent="center"
            >

                <Typography variant='h2' fontWeight={500} >
                    Contáctanos
                </Typography>
                </Box>
            <Box  display="flex" alignItems="center" justifyContent="center">                
                <Box mt={1} width={{ xs: '90%', md: '60%' }} >
                <form ref={form} onSubmit={sendEmail}>
                    <Paper sx={{ p: 1 }}>
                    <Box display='flex' gap={1} mb={1}>
                        <TextField
                        fullWidth
                        label='Nombre'
                        required
                        type='text'
                        name='user_name'
                        />
                        <TextField
                        fullWidth
                        label='Email'
                        required
                        type='email'
                        name='user_email'
                        />
                    </Box>
                    
                    <TextField
                        fullWidth
                        label='Mensaje'
                        required
                        multiline
                        name='message'
                    />
                    
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        size='large'
                        sx={{ mt: 1 }}
                    >
                        <Typography color='white'>Enviar</Typography>
                    </Button>

                    <Button
                        fullWidth
                        onClick={()=>{navigate('/')}}
                        variant='contained'
                        size='large'
                        sx={{ mt: 1 }}
                    >
                        <Typography color='white'>Volver</Typography>
                    </Button>

                    </Paper>
                </form>
                </Box>

            </Box>

            <Box mt={3} display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                <Box width={{ xs: '100%', md: '50%' }} alignItems="center" justifyContent="center" display="flex" flexDirection="row">
                    <MailIcon/>
                    <Typography ml={2} fontSize={20}>  correo@gmail.com</Typography>
                </Box>

                <Box width={{ xs: '100%', md: '50%' }} alignItems="center" justifyContent="center" display="flex" flexDirection="row">
                    <LocalPhoneIcon/>
                    <Typography fontSize={20} ml={2}>+569 12345678</Typography>
                </Box>
            </Box>

    </AppLayout>
    );
  }
  