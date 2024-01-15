import {
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Box,
    Typography,
    Button
} from '@mui/material';
import { AppLayout } from '../../layout/AppLayout';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';


const UserAccordion = ({ users }) => {
    const [expanded, setExpanded] = useState(null);


  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : null);
    };
  
    return (
      <div>


        {users.map((user) => (
          <Accordion
            key={user.id}
            expanded={expanded === user.id}
            onChange={handleChange(user.id)}

          >
            <AccordionSummary>
                <Avatar src='/src/images/avatar_default.jpg' />
                
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                    <Typography fontSize={20} fontWeight={500}>{user.nombre}</Typography>
                </Box>

            </AccordionSummary>
            <AccordionDetails>
              
                <Typography>ID: {user.id}</Typography>
                <Typography>Email: {user.email}</Typography>

                <Box sx = {{display:"flex", alignItems: "center", justifyContent: "center", width: "100%", gap:2, mt:3}}>
                    
                    <Button variant="contained" sx={{width:"25%"}} >
                        Cambiar Contaseña
                    </Button>

                    <Button variant="contained" sx={{width:"25%"}} >
                        Cambiar Rol
                    </Button>

                    <Button variant="contained" sx={{width:"25%"}} >
                        Eliminar Usuario
                    </Button>
                </Box>              
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  };




export const AdminUsers = () => {
    const navigate = useNavigate();

    const [Texto, setTexto] = useState("");

    const onInputChange = (e) => {
        setTexto(e.target.value);
      }

    const usersData = [
        {
          "id": 1,
          "nombre": "Usuario1",
          "contraseña": "contraseña1",
          "email": "usuario1@example.com"
        },
        {
          "id": 2,
          "nombre": "Usuario2",
          "contraseña": "contraseña2",
          "email": "usuario2@example.com"
        },
        {
          "id": 3,
          "nombre": "Usuario3",
          "contraseña": "contraseña3",
          "email": "usuario3@example.com"
        },
        {
          "id": 4,
          "nombre": "Usuario4",
          "contraseña": "contraseña4",
          "email": "usuario4@example.com"
        },
        {
          "id": 5,
          "nombre": "Usuario5",
          "contraseña": "contraseña5",
          "email": "usuario5@example.com"
        },
        {
          "id": 6,
          "nombre": "Usuario6",
          "contraseña": "contraseña6",
          "email": "usuario6@example.com"
        },
        {
          "id": 7,
          "nombre": "Usuario7",
          "contraseña": "contraseña7",
          "email": "usuario7@example.com"
        },
        {
          "id": 8,
          "nombre": "Usuario8",
          "contraseña": "contraseña8",
          "email": "usuario8@example.com"
        },
        {
          "id": 9,
          "nombre": "Usuario9",
          "contraseña": "contraseña9",
          "email": "usuario9@example.com"
        },
        {
          "id": 10,
          "nombre": "Usuario10",
          "contraseña": "contraseña10",
          "email": "usuario10@example.com"
        }
      ]
      

    return (
        <AppLayout>
            
            <Box  display="flex" alignItems="center" justifyContent="center" my={5}>
                <Typography variant='h2' fontWeight={500} fontSize={{xs: 30, md: 50}} >
                    Administración de usuarios
                </Typography>
            </Box>

            <Box  display="flex" alignItems="center" justifyContent="center" my={5}>
                
            <Box sx={{display: "flex",ml:4 }}>
                    <TextField
                        variant='outlined'
                        placeholder= "Ingrese un usuario" 
                        fullWidth
                        onChange={ onInputChange }
                        name="Texto" 
                        sx={{
                        '& .MuiOutlinedInput-input': {
                            backgroundColor: 'white'
                        },
                        '& fieldset': {
                            borderRadius: `0 0 0 8px`,
                        },
                        width: '40%' 
                        }}
                    />

                    <Button
                        disabled={!Texto}
                        variant='contained'
                        color='secondary'
                        sx={{
                        borderRadius: `0 8px 8px 0`,
                        }}
                    >
                        <Typography variant="button">
                            Buscar
                        </Typography>
                    </Button>
                    <Box display='flex'>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={()=>{navigate('/admin/AddUser')}}
                            sx={{
                            borderRadius: `8px 8px 8px 8px`,
                            ml:7
                            }}
                        >
                            <Typography variant="button">
                                Crear Usuario
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            

            </Box>

                
            <Box  display="flex" alignItems="center" justifyContent="center">                
                <Box mt={1} width={{ xs: '90%', md: '70%' }} >
                    <UserAccordion users={usersData} />
                </Box>
            </Box>        

        </AppLayout>
    )
}