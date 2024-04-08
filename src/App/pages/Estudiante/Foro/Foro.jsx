import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GetEjercicio,
    Get_Foro,
    Get_Retroalimentacion,
} from "../../../../helpers/foro_api";
import { AppLayout } from "../../../layout/AppLayout";

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
    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function handleBuscarForo() {
            try {
                const respu = await Get_Foro();
                setData(respu);
                setIsLoading(false);
                console.log(respu);
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
            >
                <Typography
                    variant="h2"
                    fontWeight={500}
                    fontSize={{ xs: 30, md: 50 }}
                >
                    Foro
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
                    {Data.map((jsonItem, index) => (
                        <Box key={index} mb={1}>
                            <ForoItem Data={jsonItem} />
                        </Box>
                    ))}
                </div>
            )}
        </AppLayout>
    );
};
