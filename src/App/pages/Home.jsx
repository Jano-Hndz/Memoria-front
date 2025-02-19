import { Typography } from '@mui/material';
import { useAuthStore } from "../../hooks/useAuthStore";
import { AppLayout } from '../layout/AppLayout';
import { HomeAdmin } from "./HomeAdmin";
import { HomeEstudiante } from "./HomeEstudiante";
import { HomeProfesor } from "./HomeProfesor";



export const Home = () => {

  const {user} = useAuthStore();
  const rol=user.rol
  if(rol=="admin"){ 
    return (
      <HomeAdmin/>
    )
  }
  if(rol=="estudiante"){
    return(
      <HomeEstudiante/>
    )
  }
  if(rol=="profesor"){
    return(
      <HomeProfesor/>
    )
  }

  return (
      <AppLayout>
        
        <Typography>No tiene el rol asignado hable con los administradores</Typography>
  
      </AppLayout>
    )

}
