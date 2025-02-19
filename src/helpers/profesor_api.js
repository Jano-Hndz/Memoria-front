import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const Agregar_Ejercicio = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/ejercicios/agregar`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}





export const ObtenerEjerciciosPropuestos = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/ejercicios`,data)


        if(res.data.ok){
            return res.data.lista
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const ObtenerEjerciciosPropuestosTag = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/ejercicios/tag`,data)


        if(res.data.ok){
            return res.data.lista
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}


export const ObtenerRendimientoEjercicios = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/ejercicios/rendimiento`,data)


        if(res.data.ok){
            return res.data.lista
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}



export const EliminarEjercicio = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/ejercicios/eliminar`,data)


        if(res.data.ok){
            return
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const ObtenerRendimientoAlmunos = async()=>{
    try {
        const res = await AppAPI.post(`/profesor/dataAlumnos`)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const CrearCuentasAlumnos = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/crearcuentas`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const CrearCuentasAlumnosHistorial = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/crearcuentas/historial`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const DesactivarCuentasAlumnos = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/cuentas/desactivar`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const ActivarCuentasAlumnos = async(data)=>{
    try {
        const res = await AppAPI.post(`/profesor/cuentas/activar`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}