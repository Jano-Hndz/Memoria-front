import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Pagination,
    Paper,
    Typography,
    Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GetEjercicio,
    Get_Foro,
    Get_Retroalimentacion,
    Get_post_usuario,
} from "../../../../helpers/foro_api";
import { AppLayout } from "../../../layout/AppLayout";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const ForoItem = ({ Data }) => {
    const navigate = useNavigate();

    const handleVer_ejercicio = async (event) => {
        const respu = await Get_Retroalimentacion({
            RetroalimentacionID: Data.RetroalimentacionID,
        });
        navigate("/estudiante/retroalimentacion", {
            state: {
                ...respu,
            },
        });
    };

    const handleComentar = async (event) => {
        navigate("/estudiante/Post_Foro", {
            state: {
                ...Data,
            },
        });
    };

    const handleRehacer = async (input) => {
        const respu = await GetEjercicio({
            id_consulta: Data.RetroalimentacionID,
        });

        if (respu.Propuesto) {
            navigate("/estudiante/EjerciciosPropuestos/Resolucion", {
                state: {
                    lista: respu.Respuesta,
                    problema: respu.Problema,
                    id_consulta: respu._id,
                    EJ: true,
                },
            });
        } else {
            navigate("/estudiante/resolucion", {
                state: {
                    lista: respu.Respuesta,
                    problema: respu.Problema,
                    id_consulta: respu._id,
                    EJ: false,
                },
            });
        }
    };

    return (
        <Paper
            sx={{
                width: "100%",
                p: 2,
                my: 2,
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
            }}
        >
            <Typography sx={{ ml: 6, fontSize: 18 }}>
                {Data.Usuario}:
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <Typography sx={{ ml: 6, fontSize: 18 }}>
                        {Data.Comentario}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: "70%",
                            m: 3,
                            color: "white",
                            display: Data.verRetroalimentacion ? "" : "none",
                        }}
                        onClick={handleVer_ejercicio}
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
                            m: 3,
                            color: "white",
                        }}
                        onClick={handleRehacer}
                        startIcon={<CreateIcon style={{ color: "white" }} />}
                    >
                        Resolver ejercicio
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: "70%",
                            m: 3,
                            color: "white",
                        }}
                        onClick={handleComentar}
                        startIcon={<ChatIcon style={{ color: "white" }} />}
                    >
                        Comentarios
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export const Foro = () => {
    const navigate = useNavigate();

    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading2, setIsLoading2] = useState(false);
    const [PaginasTotales, setPaginasTotales] = useState(1);

    const [Data2, setData2] = useState([]);
    const [PaginasTotales2, setPaginasTotales2] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);

    const [Pestana, setPestana] = useState("1");

    const handleChange = (event, newValue) => {
        setPestana(newValue);
    };

    const handlePageChange = async (event, value) => {
        setCurrentPage(value);
        setIsLoading(true);
        const respu = await Get_Foro({ pag: value });
        setData(respu.lista);
        setIsLoading(false);
    };

    const handlePageChange2 = async (event, value) => {
        setCurrentPage2(value);
        setIsLoading(true);
        const respu = await Get_post_usuario({ pag: value });
        setData2(respu.lista);
        setIsLoading(false);
    };

    useEffect(() => {
        async function handleBuscarForo() {
            try {
                Get_post_usuario;
                const respu = await Get_Foro({ pag: 1 });
                setData(respu.lista);
                const division = respu.cantidad / 5;
                const resultadoRedondeado = Math.ceil(division);
                setPaginasTotales(resultadoRedondeado);

                const respu2 = await Get_post_usuario({ pag: 1 });
                setData2(respu2.lista);
                const division2 = respu2.cantidad / 5;
                const resultadoRedondeado2 = Math.ceil(division2);
                setPaginasTotales2(resultadoRedondeado2);

                setIsLoading(false);
                setIsLoading2(true);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleBuscarForo();
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
                        position: "absolute",
                        left: 0,
                        fontSize: "1rem",
                        padding: "12px 24px",
                        color: "black",
                    }}
                >
                    Volver
                </Button>
                <Typography
                    variant="h2"
                    fontWeight={500}
                    fontSize={{ xs: 30, md: 50 }}
                >
                    Foro
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
                <TabContext value={Pestana}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab
                                label="General"
                                value="1"
                                sx={{ minWidth: "30vh" }}
                            />
                            <Tab
                                label="Mis publicaciones"
                                value="2"
                                sx={{ minWidth: "30vh" }}
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
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
                                    {Data.map((jsonItem, index) => (
                                        <Box key={index} mb={1}>
                                            <ForoItem Data={jsonItem} />
                                        </Box>
                                    ))}
                                </div>
                            )}

                            {isLoading2 && (
                                <Box mt={3}>
                                    <Pagination
                                        count={PaginasTotales2}
                                        page={currentPage2}
                                        onChange={handlePageChange2}
                                        size="large"
                                    />
                                </Box>
                            )}
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
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
                                    {Data2.map((jsonItem, index) => (
                                        <Box key={index} mb={1}>
                                            <ForoItem Data={jsonItem} />
                                        </Box>
                                    ))}
                                </div>
                            )}

                            {isLoading2 && (
                                <Box mt={3}>
                                    <Pagination
                                        count={PaginasTotales2}
                                        page={currentPage2}
                                        onChange={handlePageChange2}
                                        size="large"
                                    />
                                </Box>
                            )}
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </AppLayout>
    );
};
