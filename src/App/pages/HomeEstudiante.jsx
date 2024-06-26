import { Box, Button, Typography, CardContent, Card } from "@mui/material";

import BarChartIcon from "@mui/icons-material/BarChart";
import ForumIcon from "@mui/icons-material/Forum";
import HistoryIcon from "@mui/icons-material/History";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import VeraMono from '../../fonts/VeraMono.ttf'


export const HomeEstudiante = () => {
    const navigate = useNavigate();

    const handleHistorial = async () => {
        navigate("/estudiante/historial");
    };

    const handleForo = async () => {
        navigate("/estudiante/Foro");
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
                    sx={
                        {
                            fontFamily: {VeraMono}
                        }
                    }

                >
                    PrograGPT
                </Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection={"column"}
            >
                <Typography
                    variant="h2"
                    sx={{ width: "80%", textAlign: "justify" }}
                    fontSize={20}
                    fontWeight={200}
                >
                    ¡Bienvenido a nuestra innovadora plataforma de estudio para
                    estudiantes de programación! Diseñada para facilitar el
                    aprendizaje
                </Typography>

                <Box
                    width={"90%"}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    mt={4}
                >
                    <Box width={{ xs: "100%", md: "25%" }} height="100%">
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    F
                                    flexDirection="column"
                                >
                                    <Typography variant="h5" component="div">
                                        Enseña
                                    </Typography>
                                    <Typography
                                        mt={1}
                                        variant="body2"
                                        sx={{
                                            width: "90%",
                                            textAlign: "justify",
                                        }}
                                    >
                                        Nuestra plataforma utiliza ChatGPT para
                                        descomponer problemas de programación en
                                        objetivos más manejables para los
                                        estudiantes. Desde la resolución de
                                        problemas hasta la corrección de código,
                                        nuestro enfoque se centra en mejorar tus
                                        habilidades paso a paso.
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={{ xs: "100%", md: "25%" }} mx={2} height="100%">
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    F
                                    flexDirection="column"
                                >
                                    <Typography variant="h5" component="div">
                                        Corrige
                                    </Typography>
                                    <Typography
                                        my={1}
                                        variant="body2"
                                        sx={{
                                            width: "90%",
                                            textAlign: "justify",
                                        }}
                                    >
                                        Al evaluar tu código, nos enfocamos en
                                        tres aspectos clave: Funcionalidad,
                                        asegurando que tu solución cumpla con
                                        los requisitos del problema; Eficiencia,
                                        buscando optimizar tu código para un
                                        rendimiento óptimo; y Legibilidad,
                                        garantizando que tu código sea
                                        comprensible y mantenible para otros
                                        programadores.
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={{ xs: "100%", md: "25%" }} height="100%">
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    F
                                    flexDirection="column"
                                >
                                    <Typography variant="h5" component="div">
                                        Analiza
                                    </Typography>
                                    <Typography
                                        my={1}
                                        variant="body2"
                                        sx={{
                                            width: "90%",
                                            textAlign: "justify",
                                        }}
                                    >
                                        Nuestra plataforma ofrece un análisis
                                        detallado de tu rendimiento,
                                        identificando tus errores más comunes
                                        para que puedas reforzarlos y mejorar
                                        continuamente. Además, te generaremos
                                        problema de programación para que puedas
                                        practicar y ejercitar los tópicos en los
                                        que se detectaron tus mayores problemas.
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>

            <Box
                mt={10}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
            >
                <Box
                    width={{ xs: "100%", md: "33%" }}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"80%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/estudiante/consulta");
                            }}
                        >
                            <QuestionAnswerIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
                            <Typography color="white" fontSize={22}>
                                Realizar Consultas
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"80%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={handleHistorial}
                        >
                            <HistoryIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Historial Consultas
                            </Typography>
                        </Button>
                    </Box>
                </Box>

                {/* Segunda columna */}
                <Box
                    width={{ xs: "100%", md: "33%" }}
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"80%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/estudiante/EjerciciosPropuestos");
                            }}
                        >
                            <LibraryBooksIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
                            <Typography color="white" fontSize={22}>
                                Ejercicios propuestos
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"80%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={handleForo}
                        >
                            <ForumIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Foro
                            </Typography>
                        </Button>
                    </Box>
                </Box>

                <Box
                    width={{ xs: "100%", md: "33%" }}
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"80%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/estudiante/rendimiento");
                            }}
                        >
                            <BarChartIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Ver mi rendimiento
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"80%"}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/estudiante/Configuraciones");
                            }}
                        >
                            <SettingsApplicationsIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Cambiar Contraseña
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    );
};
