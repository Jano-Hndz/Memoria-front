import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages';
import {Contacto} from "../pages/Contacto"

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="contacto" element={ <Contacto /> } />
        <Route path="login" element={ <LoginPage /> } />
        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    
    </Routes>
  )
}
