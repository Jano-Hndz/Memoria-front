import { Box, Typography, Button } from "@mui/material";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { AppLayout } from "../layout/AppLayout";
import { useNavigate } from "react-router-dom";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ForumIcon from '@mui/icons-material/Forum';


export const HomeProfesor = () => {
    const navigate = useNavigate();

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
                            onClick={() => {
                                navigate("/quimfarm/IngresarPlanCompra");
                            }}
                        >
                            <RateReviewIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
                            <Typography color="white" fontSize={22}>
                                Revisar rendimientos
                            </Typography>
                        </Button>
                    </Box>

                    <Box width={"60%"}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/quimfarm/historial");
                            }}
                        >
                            <ForumIcon
                                sx={{ color: "white", mr: "5px" }}
                            />
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
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Box width={"60%"} my={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, height: "80px" }}
                            onClick={() => {
                                navigate("/quimfarm/IngresarEgresos");
                            }}
                        >
                            <Typography color="white" fontSize={22}>
                                Boton
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
                                sx={{ color: "white", mr: "3px" }}
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
