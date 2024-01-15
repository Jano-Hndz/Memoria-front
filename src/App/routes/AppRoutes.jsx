import { Navigate, Route, Routes } from "react-router-dom"
import {Home} from "../pages/Home"
import {Contacto} from "../pages/Contacto"
import {AdminUsers} from "../pages/Admin/AdminUsers"
import {AddUser} from "../pages/Admin/AddUser"


export const AppRoutes = () => {
  return (
    <Routes>
      
      
      <Route path="/admin/AddUser" element={ <AddUser/> } />
      <Route path="/admin/AdminUsers" element={ <AdminUsers/> } />


      <Route path="/contacto" element={ <Contacto/> } />
      <Route path="/" element={ <Home/> } />
      <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}
