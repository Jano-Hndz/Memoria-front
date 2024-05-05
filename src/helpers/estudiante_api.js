import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const Consulta_ChatGPT = async(data)=>{
    try {
        // console.log(data);
        const res = await AppAPI.post(`/estudiante/consulta`,data)


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

export const Revision_ChatGPT = async(data)=>{
    try {
        // console.log(data);
        const res = await AppAPI.post(`/estudiante/revision`,data)
        console.log(data);

        if(res.data.ok){
            return res.data.resp
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const GetHistorial = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/historial`,data)

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

export const Rendimiento_Estudiante = async()=>{
    try {
        const res = await AppAPI.post(`/estudiante/rendimiento`)

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





export const ObtenerEjerciciosPropuestosEstudiante = async(data)=>{
    try {
        console.log("entro");
        const res = await AppAPI.post(`/estudiante/ejerciciospropuestos`,data)

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


export const ObtenerEjerciciosPropuestosTagEstudiante = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/ejerciciospropuestos/tag`,data)


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

export const Analisis_Rendimiento_Estudiante = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/rendimiento/analisis`,data)


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

export const GET_Rendimiento_Estudiante = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/rendimiento/get`,data)


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

export const CambiarContrasena = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/contrasena`,data)
        
        return res.data

        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}