import Swal from 'sweetalert2';
import { AppAPI } from "../api";

export const Publicar_Foro = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/Foro/publicar`,data)


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


export const Get_Foro = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/Foro/get`,data)


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

export const Get_post_usuario = async(data)=>{
    try {
        const res = await AppAPI.post(`/estudiante/foro/get/user`,data)


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


export const Get_Retroalimentacion = async(data)=>{
    try {

        const res = await AppAPI.post(`/estudiante/foro/retroalimentacion`,data)


        if(res.data.ok){
            return res.data.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}


export const ComentarForo = async(data)=>{
    try {

        const res = await AppAPI.post(`/estudiante/foro/comentar`,data)


        if(res.data.ok){
            return res.data.id_comentario
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const PostForo = async(data)=>{
    try {

        const res = await AppAPI.post(`/estudiante/foro/comentarios`,data)


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


export const GetEjercicio = async(data)=>{
    try {

        const res = await AppAPI.post(`/estudiante/foro/ejercicio`,data)


        if(res.data.ok){
            return res.data.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}
