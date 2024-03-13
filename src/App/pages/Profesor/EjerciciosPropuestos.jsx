import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid,CircularProgress, Paper, TextField,    AccordionDetails,
    AccordionSummary, Accordion ,Divider} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../helpers/funciones";
import Swal from "sweetalert2";
import { ObtenerEjerciciosPropuestos } from "../../../helpers/profesor_api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';

const EjercicioItem = ({ Data }) => {

    const navigate = useNavigate();



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
            <Box>
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
                    {Ejercicios.map((jsonItem, index) => (
                        <Box key={index} mb={1}>
                            <EjercicioItem Data={jsonItem} />
                        </Box>
                    ))}
                </div>
            )}
        </AppLayout>
    );
};
