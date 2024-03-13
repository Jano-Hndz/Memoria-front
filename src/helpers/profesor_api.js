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