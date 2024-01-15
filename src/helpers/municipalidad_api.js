import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const GetDataIngresosEgresos = async()=>{
    try {
        const res = await AppAPI.get(`/municipalidad/dataIngreEgre`)

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