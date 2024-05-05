import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Pagination,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerEjerciciosPropuestosEstudiante } from "../../../helpers/estudiante_api";
import { AppLayout } from "../../layout/AppLayout";

const EjercicioItem = ({ Data }) => {
    const navigate = useNavigate();
    const handleResolver = async () => {
        navigate("/estudiante/EjerciciosPropuestos/Resolucion", {
            state: {
                lista: Data.Respuesta,
                problema: Data.Problema,
                id_consulta: Data._id,
                EJ: true,
            },
        });
    };

    const handleChip = (tag) => {
        navigate("/estudiante/EjerciciosPropuestos/tag", {
            state: {
                data: tag,
            },
        });
    };

    return (
        <Accordion
            key={Data._id}
            style={{ border: "1px solid #ef7fa0", width: "75vw" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${Data.id_retroalimento}-content`}
                id={`panel-${Data.id_retroalimento}-header`}
            >
                <Box
                    flexDirection={"column"}
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        mx: 5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            mt: 2,
                        }}
                    >
                        <Typography sx={{ fontSize: 23 }}>
                            {Data.Titulo}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        {Data.Tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                style={{
                                    marginRight: "0.5rem",
                                    marginTop: "0.5rem",
                                }}
                                variant="outlined"
                                onClick={() => handleChip(tag)}
                            />
                        ))}
                    </Box>
                </Box>
            </AccordionSummary>

            <AccordionDetails
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    flexDirection={"column"}
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
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
                                height: "50px",
                                m: 3,
                            }}
                            onClick={handleResolver}
                            startIcon={
                                <CreateIcon style={{ color: "white" }} />
                            }
                        >
                            Resolver el Problema
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const EjerciciosPropuestosEstudiante = () => {
    const [Ejercicios, setEjercicios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(false);
    const [PaginasTotales, setPaginasTotales] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handlePageChange = async (event, value) => {
        setCurrentPage(value);
        setIsLoading(true);
        const respu = await ObtenerEjerciciosPropuestosEstudiante({
            pag: value,
        });
        setEjercicios(respu.lista);
        setIsLoading(false);
    };

    useEffect(() => {
        async function handleBuscarEjerciciosPropuestos() {
            try {
                const respu = await ObtenerEjerciciosPropuestosEstudiante({
                    pag: 1,
                });
                setEjercicios(respu.lista);
                const division = respu.cantidad / 5;
                const resultadoRedondeado = Math.ceil(division);
                setPaginasTotales(resultadoRedondeado);
                setIsLoading(false);
                setIsLoading2(true);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleBuscarEjerciciosPropuestos();
    }, []);

    return (
        <AppLayout>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={5}
                position="relative"
            >
                <Button
                    onClick={() => navigate("/")}
                    style={{
                        position: 'absolute',
                        left: 0,
                        fontSize: '1rem',
                        padding: '12px 24px',
                        color: 'black' 
                    }}
                >
                    Volver
                </Button>
                <Typography
                    variant="h2"
                    fontWeight={500}
                    fontSize={{ xs: 30, md: 50 }}
                >
                    Ejercicios Propuestos
                </Typography>
            </Box>

           

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {isLoading ? (
                    <Box>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        {Ejercicios.map((jsonItem, index) => (
                            <Box key={index} mb={1}>
                                <EjercicioItem Data={jsonItem} />
                            </Box>
                        ))}
                    </Box>
                )}

                {isLoading2 && (
                    <Box mt={3}>
                        <Pagination
                            count={PaginasTotales}
                            page={currentPage}
                            onChange={handlePageChange}
                            size="large"
                        />
                    </Box>
                )}
            </Box>
        </AppLayout>
    );
};
