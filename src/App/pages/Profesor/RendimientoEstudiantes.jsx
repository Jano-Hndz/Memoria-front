import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PreviewIcon from '@mui/icons-material/Preview';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData } from "../../../helpers/funciones";
import {ObtenerRendimientoAlmunos} from "../../../helpers/profesor_api";
import { AppLayout } from "../../layout/AppLayout";
import Circulo from '../../../helpers/Circulo';
import { calcularPromedio } from "../../../helpers/funciones";
import { CircularWithValueLabel } from "../../../helpers/CircularWithValueLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";


const RendimientoItem = ({ Data, Estudiante }) => {

    const navigate = useNavigate();

    let funcionalidad = 0
    let legibilidad = 0
    let eficiencia = 0
    console.log(Data);
    console.log(Data.length);

    if (Data.length < 5){
        console.log("entro");
        return (
            <Accordion key={Estudiante._id} style={{ border: "1px solid #ef7fa0" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${Estudiante._id}-content`}
                id={`panel-${Estudiante._id}-header`}
            >
                <Box
                    sx={{ display: "flex", alignItems: "center", my: 2, ml: 3 }}
                >
                    <Typography sx={{ ml: 6, fontSize: 23 }}>
                        {Estudiante.name}
                    </Typography>
                </Box>
            </AccordionSummary>
            </Accordion>
        )
    }else{


    for (const calificacion of Data) {
        let JSON_Calificaciones = calcularPromedio(calificacion.RespuestaLLM);
        funcionalidad =  funcionalidad + JSON_Calificaciones.Funcionalidad
        legibilidad = legibilidad + JSON_Calificaciones.Legibilidad
        eficiencia = eficiencia + JSON_Calificaciones.Eficiencia
    }

    funcionalidad =  funcionalidad / Data.length
    legibilidad = legibilidad / Data.length
    eficiencia = eficiencia / Data.length

    let Promedio_Estudiante = (funcionalidad + legibilidad + eficiencia)*10/3


    let color_circulo
    
    if(Promedio_Estudiante < 55){
        color_circulo = "rojo"
    }
    if (55<Promedio_Estudiante && Promedio_Estudiante<80){
        color_circulo = "amarillo"    
    }
    if(Promedio_Estudiante>80){
        color_circulo = "verde"
    }


    return (
        <Accordion key={Estudiante._id} style={{ border: "1px solid #ef7fa0" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${Estudiante._id}-content`}
                id={`panel-${Estudiante._id}-header`}
            >
                <Box
                    sx={{ display: "flex", alignItems: "center", my: 2, ml: 3 }}
                >
                    <Circulo color={color_circulo} />
                    <Typography sx={{ ml: 6, fontSize: 23 }}>
                        {Estudiante.name}
                    </Typography>
                </Box>
            </AccordionSummary>

            <AccordionDetails
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box flexDirection={"column"} width={"100%"}>
                <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={3}>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                sx={{ textAlign: "center" }}
                            >
                                <Typography
                                    sx={{ fontSize: 20 }}
                                    variant="body1"
                                >
                                    Funcionalidad
                                </Typography>

                                <Box mt={2}>
                                    <CircularWithValueLabel
                                        value={
                                            funcionalidad*
                                            10
                                        }
                                        size={50}
                                    />
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                sx={{ textAlign: "center" }}
                            >
                                <Typography
                                    sx={{ fontSize: 20 }}
                                    variant="body1"
                                >
                                    Legibilidad
                                </Typography>
                                <Box mt={2}>
                                    <CircularWithValueLabel
                                        value={
                                            legibilidad * 10
                                        }
                                        size={50}
                                    />
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                sx={{ textAlign: "center" }}
                            >
                                <Typography
                                    sx={{ fontSize: 20 }}
                                    variant="body1"
                                >
                                    Eficiencia
                                </Typography>
                                <Box mt={2}>
                                    <CircularWithValueLabel
                                        value={
                                            eficiencia * 10
                                        }
                                        size={50}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </AccordionDetails>
        </Accordion>
    );
}};

export const RendimientoEstudiantes = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [Data, setData] = useState([])


    useEffect(() => {
        async function handleRendimiento() {
            try {
                const respu = await ObtenerRendimientoAlmunos()
                setData(respu);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleRendimiento();
    }, []);


    return (
        <AppLayout>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={5}
            >
                <Typography
                    variant="h2"
                    fontWeight={500}
                    fontSize={{ xs: 30, md: 50 }}
                >
                    Rendimiento alumnos
                </Typography>
            </Box>
            
            {isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    {(Data.lista).map((jsonItem, index) => (
                        <Box key={index} mb={1}>
                            <RendimientoItem Data={jsonItem} Estudiante={Data.estudiantes[index]} />
                        </Box>
                    ))}
                </div>
            )}
        </AppLayout>
    );
};

