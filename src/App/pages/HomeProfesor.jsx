import ForumIcon from "@mui/icons-material/Forum";
import HistoryIcon from "@mui/icons-material/History";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import { CrearCuentasAlumnos } from "../../helpers/profesor_api";
import { AppLayout } from "../layout/AppLayout";
import { Box, Button, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export const HomeProfesor = () => {
    const navigate = useNavigate();

    const handleEjerciciosPropuestos = async () => {
        navigate("/profesor/EjerciciosPropuestos", {
            state: {
                mostrar: false,
            },
        });
    };

    const handleForo = async () => {
        navigate("/estudiante/Foro");
    };

    return (
        <AppLayout>
            <Box
                mt={10}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
            >
                <Box
                    width={{ xs: "100%", md: "50%" }}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"60%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                navigate("/profesor/Rendimiento");
                            }}
                            sx={{ mt: 1, height: "80px" }}
                        >
                            <HistoryIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Rendimiento
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"60%"} mb={6}>
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

                {/* Segunda columna */}
                <Box
                    width={{ xs: "100%", md: "50%" }}
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"60%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={handleEjerciciosPropuestos}
                        >
                            <LibraryBooksIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
                            <Typography color="white" fontSize={22}>
                                Ejercicios propuestos
                            </Typography>
                        </Button>
                    </Box>

                    


                    <Box width={"60%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/profesor/adminCuentas");
                            }}
                        >
                            <PersonIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                            Administrar Cuentas Alumnos
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    );
};
