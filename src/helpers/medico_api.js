import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const ConsultaRUT = async(formRut)=>{
    try {
        const res = await AppAPI.post(`/medico/rut`,{rut:formRut})


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

export const MedicamentosDisponibles = async()=>{
    try {
        const res = await AppAPI.post(`/medico/medicamentos`,)


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

export const EnviarReceta = async(data)=>{
    try {
        const res = await AppAPI.post(`/medico/receta/crear`,data)


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