import { Box, Typography, Button } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { AppLayout } from "../layout/AppLayout";
import { useNavigate } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import ForumIcon from "@mui/icons-material/Forum";
import HistoryIcon from "@mui/icons-material/History";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {Get_Foro} from "../../helpers/foro_api"



export const HomeProfesor = () => {
    const navigate = useNavigate();

    const handleEjerciciosPropuestos = async () => {
        navigate("/profesor/EjerciciosPropuestos",{
            state: {
                data: "Data"
            },
        });
    };

    const handleForo = async () => {
        const resp = await Get_Foro ()
        navigate("/estudiante/Foro",{
            state: {
                Data: resp
            },
        });
    };

    return (
        <AppLayout>
            <Box
                mt={6}
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
                            sx={{ mt: 1, height: "80px" }}

                        >
                            <QuestionAnswerIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
                            <Typography color="white" fontSize={22}>
                                ??????????????
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"60%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                        >
                            <HistoryIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Rendimiento
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"60%"}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}

                        >
                            <BarChartIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                ??????????????????
                            </Typography>
                        </Button>
                    </Box>
                </Box>

                {/* Segunda columna */}
                <Box
                    width={{ xs: "100%", md: "50%" }}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"60%"} my={6}>
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
                            onClick={handleForo}
                        >
                            <ForumIcon sx={{ color: "white", mr: "5px" }} />
                            <Typography color="white" fontSize={22}>
                                Foro
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"60%"} mb={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                navigate("/contacto");
                            }}
                            sx={{ mt: 1, height: "80px" }}
                        >
                            <ReportProblemIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
                            <Typography color="white" fontSize={22}>
                                Notificar Problema
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    );
};
