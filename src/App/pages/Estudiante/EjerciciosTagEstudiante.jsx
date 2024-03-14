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
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../helpers/funciones";
import { ObtenerEjerciciosPropuestosTag } from "../../../helpers/profesor_api";
import { AppLayout } from "../../layout/AppLayout";


const EjercicioItem = ({ Data }) => {

    const navigate = useNavigate();


    const handleChip = (tag) => {
        console.log(tag);
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
                    <Box mb={3} sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                    {(Data.Tags).map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                style={{ marginRight: "0.5rem", marginTop:"0.5rem"}}
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


    useEffect(() => {
        async function handleBuscarEjerciciosPropuestos() {
            try {
                const respu = await ObtenerEjerciciosPropuestosTag({Tag:data.data});
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


    return (
        <AppLayout>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                my={5}
            >
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
                    ({data.data})
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
