
import { useLocation, useNavigate } from "react-router-dom";


export const getData = ()=>{
    const location = useLocation();
    const data = location.state;
    return data;
}


export const calcularPromedio = (jsonList)=>{
    let totalFuncionalidad = 0;
    let totalLegibilidad = 0;
    let totalEficiencia = 0;

    // Sumar los valores de cada métrica
    jsonList.forEach((jsonObj) => {
        totalFuncionalidad += jsonObj.Funcionalidad;
        totalLegibilidad += jsonObj.Legibilidad;
        totalEficiencia += jsonObj.Eficiencia;
    });

    const n = jsonList.length;

    // Calcular el promedio de cada métrica
    const promedioFuncionalidad = Math.round((totalFuncionalidad / n) * 2) / 2;
    const promedioLegibilidad = Math.round((totalLegibilidad / n) * 2) / 2;
    const promedioEficiencia = Math.round((totalEficiencia / n) * 2) / 2;

    return {
        Funcionalidad: promedioFuncionalidad,
        Legibilidad: promedioLegibilidad,
        Eficiencia: promedioEficiencia,
    };
}