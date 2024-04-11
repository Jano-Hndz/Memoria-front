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


const RendimientoItem = ({ Data, Problema }) => {

    const navigate = useNavigate();


    const JSON_Calificaciones = calcularPromedio(Data.RespuestaLLM);


    const handleVerRetoalimentacion = async () => {
        console.log(Problema);
        navigate("/estudiante/retroalimentacion", {
            state: {
                inputs: Data.RespuestaEstudiante,
                retroalimentacion: Data.RespuestaLLM,
                lista_funciones: Problema.Respuesta,
                problema: Problema.Problema,
            },
        });
    };


    return (
        <Accordion key={Data._id} style={{ border: "1px solid #ef7fa0" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${Data.id_retroalimento}-content`}
                id={`panel-${Data.id_retroalimento}-header`}
            >
                <Box
                    sx={{ display: "flex", alignItems: "center", my: 2, ml: 3 }}
                >
                    <Circulo color="verde" />
                    <Typography sx={{ ml: 6, fontSize: 23 }}>
                        {Data.Nombre}
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
                                            JSON_Calificaciones.Funcionalidad *
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
                                            JSON_Calificaciones.Legibilidad * 10
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
                                            JSON_Calificaciones.Eficiencia * 10
                                        }
                                        size={50}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "70%",
                                m: 3,
                                height: "50px",
                                color: "white",
                            }}
                            onClick={handleVerRetoalimentacion}
                            startIcon={
                                <VisibilityIcon style={{ color: "white" }} />
                            }
                        >
                            Ver retroalimentación
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

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
                    {/* {Data.map((jsonItem, index) => (
                        <Box key={index} mb={1}>
                            <RendimientoItem Data={jsonItem} Problema={data} />
                        </Box>
                    ))} */}
                </div>
            )}
        </AppLayout>
    );
};

