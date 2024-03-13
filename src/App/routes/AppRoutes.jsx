import { Navigate, Route, Routes } from "react-router-dom"
import {Home} from "../pages/Home"
import {Contacto} from "../pages/Contacto"
import {AdminUsers} from "../pages/Admin/AdminUsers"
import {AddUser} from "../pages/Admin/AddUser"
import {Consulta} from "../pages/Estudiante/Consulta"
import { Resolucion } from "../pages/Estudiante/Resolucion"
import {Retroalimentacion} from "../pages/Estudiante/Retroalimentacion"
import {Historial} from "../pages/Estudiante/Historial"
import {EjerciciosPropuestosEstudiante} from "../pages/Estudiante/EjerciciosPropuestosEstudiante"

import {PublicarForo} from "../pages/Estudiante/Foro/PublicarForo"
import {Foro} from "../pages/Estudiante/Foro/Foro"
import {Post_Foro} from "../pages/Estudiante/Foro/Post_Foro"
import {EjerciciosPropuestos} from "../pages/Profesor/EjerciciosPropuestos"
import {AgregarEjercicio} from "../pages/Profesor/AgregarEjercicio"


export const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/estudiante/Consulta" element={ <Consulta/> } />
      <Route path="/estudiante/Resolucion" element={ <Resolucion/> } />
      <Route path="/estudiante/Retroalimentacion" element={ <Retroalimentacion/> } />
      <Route path="/estudiante/Historial" element={ <Historial/> } />
      <Route path="/estudiante/Foro/Publicar" element={ <PublicarForo/> } />
      <Route path="/estudiante/Foro" element={ <Foro/> } />
      <Route path="/estudiante/Post_Foro" element={ <Post_Foro/> } />
      <Route path="/estudiante/EjerciciosPropuestos" element={ <EjerciciosPropuestosEstudiante/> } />



      <Route path="/profesor/EjerciciosPropuestos" element={ <EjerciciosPropuestos/> } />
      <Route path="/profesor/AgregarEjercicio" element={ <AgregarEjercicio/> } />


      
      <Route path="/admin/AddUser" element={ <AddUser/> } />
      <Route path="/admin/AdminUsers" element={ <AdminUsers/> } />


      <Route path="/contacto" element={ <Contacto/> } />
      <Route path="/" element={ <Home/> } />
      <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}
