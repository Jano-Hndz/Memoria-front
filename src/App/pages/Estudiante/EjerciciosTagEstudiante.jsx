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
import { getData } from "../../../helpers/funciones";
import { ObtenerEjerciciosPropuestosTagEstudiante } from "../../../helpers/estudiante_api";
import { AppLayout } from "../../layout/AppLayout";

const EjercicioItem = ({ Data, onFetchExercises }) => {
    const navigate = useNavigate();

    const handleChip = async (tag) => {
        await onFetchExercises(tag);
    };

    const handleResolver = async () => {
        navigate("/estudiante/resolucion", {
            state: {
                lista: Data.Respuesta,
                problema: Data.Problema,
                id_consulta: Data._id,
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

export const EjerciciosTagEstudiante = () => {
    const navigate = useNavigate();
    const [Ejercicios, setEjercicios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const data = getData();
    const [Titulo, setTitulo] = useState(data.data);
    const [isLoading2, setIsLoading2] = useState(false);
    const [PaginasTotales, setPaginasTotales] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = async (event, value) => {
        setCurrentPage(value);
        setIsLoading(true);
        const respu = await ObtenerEjerciciosPropuestosTagEstudiante({
            Tag: data.data,
            pag: 1,
        });
        setEjercicios(respu.lista);
        setIsLoading(false);
    };

    async function handleBuscarEjerciciosPropuestos(tag) {
        try {
            setIsLoading(true);
            setTitulo(tag);
            const respu = await ObtenerEjerciciosPropuestosTagEstudiante({
                Tag: tag,
                pag: 1,
            });
            console.log(respu);
            const division = respu.cantidad / 5;
            const resultadoRedondeado = Math.ceil(division);
            setPaginasTotales(resultadoRedondeado);
            setEjercicios(respu.lista);
            setIsLoading(false);
            setIsLoading2(true);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleBuscarEjerciciosPropuestos(data.data);
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
                    onClick={() => navigate("/estudiante/EjerciciosPropuestos")}
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

                <Typography
                    variant="h4"
                    fontWeight={500}
                    fontSize={{ xs: 30, md: 50 }}
                >
                    ({Titulo})
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
                    <div>
                        {Ejercicios.map((jsonItem, index) => (
                            <Box key={index} mb={1}>
                                <EjercicioItem
                                    Data={jsonItem}
                                    onFetchExercises={
                                        handleBuscarEjerciciosPropuestos
                                    }
                                />
                            </Box>
                        ))}
                    </div>
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
