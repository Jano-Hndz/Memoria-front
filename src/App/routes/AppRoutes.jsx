import { Navigate, Route, Routes } from "react-router-dom"
import { AddUser } from "../pages/Admin/AddUser"
import { AdminUsers } from "../pages/Admin/AdminUsers"
import { Contacto } from "../pages/Contacto"
import { Consulta } from "../pages/Estudiante/Consulta"
import { EjerciciosPropuestosEstudiante } from "../pages/Estudiante/EjerciciosPropuestosEstudiante"
import { EjerciciosTagEstudiante } from "../pages/Estudiante/EjerciciosTagEstudiante"
import { Foro } from "../pages/Estudiante/Foro/Foro"
import { Post_Foro } from "../pages/Estudiante/Foro/Post_Foro"
import { PublicarForo } from "../pages/Estudiante/Foro/PublicarForo"
import { Historial } from "../pages/Estudiante/Historial"
import { Resolucion } from "../pages/Estudiante/Resolucion"
import { ResolucionEP } from "../pages/Estudiante/ResolucionEP"
import { Retroalimentacion } from "../pages/Estudiante/Retroalimentacion"
import { Home } from "../pages/Home"
import { AgregarEjercicio } from "../pages/Profesor/AgregarEjercicio"
import { EjerciciosPropuestos } from "../pages/Profesor/EjerciciosPropuestos"
import { EjerciciosTag } from "../pages/Profesor/EjerciciosTag"
import {RendimientoEP} from "../pages/Profesor/RendimientoEP"



import {Test} from "../pages/Test"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Test" element={ <Test/> } />

      
      <Route path="/estudiante/Consulta" element={ <Consulta/> } />
      <Route path="/estudiante/Resolucion" element={ <Resolucion/> } />
      <Route path="/estudiante/Retroalimentacion" element={ <Retroalimentacion/> } />
      <Route path="/estudiante/Historial" element={ <Historial/> } />
      <Route path="/estudiante/Foro/Publicar" element={ <PublicarForo/> } />
      <Route path="/estudiante/Foro" element={ <Foro/> } />
      <Route path="/estudiante/Post_Foro" element={ <Post_Foro/> } />
      <Route path="/estudiante/EjerciciosPropuestos" element={ <EjerciciosPropuestosEstudiante/> } />
      <Route path="/estudiante/EjerciciosPropuestos/Resolucion" element={ <ResolucionEP/> } />
      <Route path="/estudiante/EjerciciosPropuestos/tag" element={ <EjerciciosTagEstudiante/> } />




      <Route path="/profesor/EjerciciosPropuestos" element={ <EjerciciosPropuestos/> } />
      <Route path="/profesor/AgregarEjercicio" element={ <AgregarEjercicio/> } />
      <Route path="/profesor/EjerciciosTag" element={ <EjerciciosTag/> } />
      <Route path="/profesor/Ejercicios/Rendimiento" element={ <RendimientoEP/> } />




      
      <Route path="/admin/AddUser" element={ <AddUser/> } />
      <Route path="/admin/AdminUsers" element={ <AdminUsers/> } />


      <Route path="/contacto" element={ <Contacto/> } />
      <Route path="/" element={ <Home/> } />
      <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}
