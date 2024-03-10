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

export const GetHistorial = async()=>{
    try {
        const res = await AppAPI.get(`/estudiante/historial`)

        if(res.data.ok){
            return res.data.historial
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}