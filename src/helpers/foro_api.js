import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const Publicar_Foro = async(data)=>{
    try {
        // console.log(data);
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


export const Get_Foro = async()=>{
    try {
        // console.log(data);
        const res = await AppAPI.get(`/estudiante/Foro/get`)


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


export const Get_Retroalimentacion = async(data)=>{
    try {
        console.log(data);

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
        console.log(data);

        const res = await AppAPI.post(`/estudiante/foro/comentar`,data)


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

export const PostForo = async(data)=>{
    try {
        console.log(data);

        const res = await AppAPI.post(`/estudiante/foro/get`,data)


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
