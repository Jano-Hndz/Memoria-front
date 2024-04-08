import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PreviewIcon from '@mui/icons-material/Preview';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData } from "../../../helpers/funciones";
import {ObtenerRendimientoEjercicios} from "../../../helpers/profesor_api";
import { AppLayout } from "../../layout/AppLayout";
import Circulo from '../../../helpers/Circulo';

const RendimientoItem = ({ Data }) => {

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
                    <Circulo color="verde" />
                    <Typography sx={{ ml: 6, fontSize: 23 }}>
                        {Data.Nombre}
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const RendimientoEP = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [Data, setData] = useState([])
    const { id } = getData();



    useEffect(() => {
        async function handleRendimientoEjerciciosPropuestos() {
            try {
                const respu = await ObtenerRendimientoEjercicios({EjercicioPropuestoID:id})
                setData(respu);
                setIsLoading(false);
                console.log(respu);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleRendimientoEjerciciosPropuestos();
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
                    Rendimiento alumnos
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
                            <RendimientoItem Data={jsonItem} />
                        </Box>
                    ))}
                </div>
            )}
        </AppLayout>
    );
};

