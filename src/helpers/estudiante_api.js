import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const Consulta_ChatGPT = async(data)=>{
    try {
        console.log(data);
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