import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Rating,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { calcularPromedio, getData } from "../../../helpers/funciones";
import { AppLayout } from "../../layout/AppLayout";
import {CircularWithValueLabel} from "../../../helpers/CircularWithValueLabel"

const AccordionItem = ({ Data }) => {
    const navigate = useNavigate();

    const retroalimentaciones = JSON.parse(`[${Data.Retroalimentacion}]`)
    

    const JSON_Calificaciones = calcularPromedio(retroalimentaciones);

    const handleVerRetoalimentacion = async () => {
        console.log({
            inputs: Data.Respuesta_Estudiante,
            retroalimentacion: Data.Retroalimentacion,
            lista_funciones: JSON.parse(Data.RespuestaSubojetivos),
            problema: Data.Problema,
        });
        navigate("/estudiante/retroalimentacion", {
            state: {
                inputs: Data.Respuesta_Estudiante,
                retroalimentacion: Data.Retroalimentacion,
                lista_funciones: JSON.parse(Data.RespuestaSubojetivos),
                problema: Data.Problema,
            },

        });
    };

    const handleRehacer = async (input) => {
        navigate("/estudiante/resolucion", {
            state: {
                lista: Data.RespuestaSubojetivos,
                problema: Data.Problema,
                id_consulta: Data.id_consulta,
                EJ:false
            },
        });
    };

    const handleCompartir = async (input) => {
        navigate("/estudiante/Foro/publicar", {
            state: {
                Data
            }
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
                    <Typography sx={{ ml: 6, fontSize: 23 }}>
                        {Data.Titulo}
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
                <Box flexDirection={"column"}>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ width: "90%", textAlign: "justify" }}
                        >
                            {Data.Problema}
                        </Typography>

                        <Divider />
                    </Box>
                    <Box>
                        <Typography
                            sx={{ fontSize: 28, textAlign: "center" }}
                            mt={5}
                            mb={2}
                        >
                            Calificación
                        </Typography>
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
                                <CircularWithValueLabel value={JSON_Calificaciones.Funcionalidad*10} size={50}/>
          
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
                                <CircularWithValueLabel value={JSON_Calificaciones.Legibilidad*10} size={50}/>

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
                                    <CircularWithValueLabel value={JSON_Calificaciones.Eficiencia*10} size={50}/>
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
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "70%",
                                height: "50px",
                                m: 3,
                            }}
                            onClick={handleRehacer}
                            startIcon={
                                <CreateIcon style={{ color: "white" }} />
                            }
                        >
                            Volver a responder el problema
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "70%",
                                height: "50px",
                                m: 3,
                            }}
                            onClick={handleCompartir}
                            startIcon={<ShareIcon style={{ color: "white" }} />}
                        >
                            Compartir en el foro
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const Historial = () => {
    const { data } = getData();
    console.log(data);
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
                    Historial
                </Typography>
            </Box>

            {data.map((jsonItem, index) => (
                <Paper key={index}>
                    <AccordionItem Data={jsonItem} />
                </Paper>
            ))}
        </AppLayout>
    );
};
