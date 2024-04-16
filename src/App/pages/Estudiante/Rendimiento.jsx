import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Button,
    Paper,
} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import { useState, useEffect } from "react";
import { CircularWithValueLabel } from "../../../helpers/CircularWithValueLabel";
import { Rendimiento_Estudiante,Analisis_Rendimiento_Estudiante } from "../../../helpers/estudiante_api";
import { calcularPromedio } from "../../../helpers/funciones";
import { useNavigate } from 'react-router-dom';


export const Rendimiento = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [Data, setData] = useState([]);
    const [isEnabled, setIsEnabled] = useState(true);

    
    let funcionalidad = 0
    let legibilidad = 0
    let eficiencia = 0


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


    useEffect(() => {
        async function handleRendimiento() {
            try {
                const respu = await Rendimiento_Estudiante();
                console.log(respu);
                setData(respu.lista);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleRendimiento();
    }, []);
    const navigate = useNavigate();


    const handleAnalizar = async() => {
        setIsEnabled(false)
        let lista_data = []
        for (const elemento of Data) {
            for (const Item of elemento.RespuestaLLM) {
                lista_data.push(Item.Retroalimentación);
            }
        }
        const respuesta= await Analisis_Rendimiento_Estudiante({Rendimiento:lista_data})
        navigate('/estudiante/Rendimiento/Resultado',{
            state: {
                ...respuesta
            },
        });
        setIsEnabled(true)
        
    };

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
                    Mi Rendimiento
                </Typography>
            </Box>

            <Paper
                sx={{
                    width: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleAnalizar}
                            sx={{ width: "20%", marginBottom: "1%" }}
                        disabled={!isEnabled} 

                        >
                            Generar un analisis de mi rendimiento
                        </Button>

                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}>
                        <Typography
                                        sx={{ fontSize: 20 }}
                                        variant="body1"
                                    >
                                        Promedio Final
                                    </Typography>

                                    <Box mt={2}>
                                    <Typography
                                        sx={{ fontSize: 40 }}
                                        variant="body1"
                                    >
                                        {Math.ceil(Promedio_Estudiante)}
                                    </Typography>
                                    </Box>
                        </Box>

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
                                            value={funcionalidad*10}
                                            size={80}
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
                                            value={legibilidad*10}
                                            size={80}
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
                                            value={eficiencia*10}
                                            size={80}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Paper>
        </AppLayout>
    );
};
