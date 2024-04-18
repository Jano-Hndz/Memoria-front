import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PreviewIcon from "@mui/icons-material/Preview";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData } from "../../../helpers/funciones";
import { ObtenerEjerciciosPropuestos } from "../../../helpers/profesor_api";
import { AppLayout } from "../../layout/AppLayout";

const EjercicioItem = ({ Data }) => {
    const navigate = useNavigate();

    const handleChip = (tag) => {
        navigate("/profesor/EjerciciosTag", {
            state: {
                data: tag,
            },
        });
    };

    const handleRendimiento = async () => {
        navigate("/profesor/Ejercicios/Rendimiento", {
            state: {
                id: Data._id,
                data: Data,
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
                        mb={3}
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
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
                                m: 3,
                                height: "50px",
                                color: "white",
                            }}
                            onClick={handleRendimiento}
                            startIcon={
                                <PreviewIcon style={{ color: "white" }} />
                            }
                        >
                            Ver rendimiento
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "70%",
                                height: "50px",
                                m: 3,
                            }}
                            startIcon={
                                <DeleteIcon style={{ color: "white" }} />
                            }
                        >
                            Eliminar
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const EjerciciosPropuestos = () => {
    const navigate = useNavigate();
    const [Ejercicios, setEjercicios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function handleBuscarEjerciciosPropuestos() {
            try {
                const respu = await ObtenerEjerciciosPropuestos({});
                setEjercicios(respu);
                setIsLoading(false);
                console.log(respu);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleBuscarEjerciciosPropuestos();
    }, []);

    const handleAgregar = async () => {
        navigate("/profesor/AgregarEjercicio");
    };

    const { mostrar } = getData();

    if (mostrar) {
        Swal.fire({
            icon: "success",
            title: "Éxito!",
            text: "El ejercicio se ha agregado correctamente.",
            confirmButtonText: "Aceptar",
        });
    }

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
                <Box mb={3}>
                    <Button
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={handleAgregar}
                    >
                        <AddIcon sx={{ color: "white", mr: "5px" }} />
                        <Typography color="white" fontSize={22}>
                            Agregar ejercicio
                        </Typography>
                    </Button>
                </Box>

                {isLoading ? (
                    <Box>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div>
                        {Ejercicios.map((jsonItem, index) => (
                            <Box key={index} mb={1}>
                                <EjercicioItem Data={jsonItem} />
                            </Box>
                        ))}
                    </div>
                )}
            </Box>
        </AppLayout>
    );
};
