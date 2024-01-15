import { Typography } from '@mui/material';
import { useAuthStore } from "../../hooks/useAuthStore";
import {HomeAdmin} from "./HomeAdmin"
import { AppLayout } from '../layout/AppLayout';
import {HomeEstudiante} from "./HomeEstudiante"
import {HomeProfesor} from "./HomeProfesor"



export const Home = () => {

  const {user } = useAuthStore();
  const rol="profesor"
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
