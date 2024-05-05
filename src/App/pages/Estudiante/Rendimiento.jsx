import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Paper,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularWithValueLabel } from "../../../helpers/CircularWithValueLabel";
import {
    Analisis_Rendimiento_Estudiante,
    GET_Rendimiento_Estudiante,
    Rendimiento_Estudiante,
} from "../../../helpers/estudiante_api";
import { calcularPromedio } from "../../../helpers/funciones";
import { AppLayout } from "../../layout/AppLayout";
import CreateIcon from "@mui/icons-material/Create";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Swal from "sweetalert2";



const AccordionItem = ({ Data }) => {
    const navigate = useNavigate();

    const handleResolver = async () => {
        navigate("/estudiante/EjerciciosPropuestos/Resolucion", {
            state: {
                lista: Data.RespuestaSubojetivos,
                problema: Data.Problema,
                id_consulta: Data.id_EjercicioPropuesto,
                EJ: true,
            },
        });
    };

    const fecha = new Date(Data.Date);

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    const fechaFormateada = `${dia}-${mes}-${año}`;

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
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        my: 3,
                        ml: 3,
                    }}
                >
                    <Typography sx={{ ml: 6, fontSize: 20 }}>
                        Analisis de Rendimiento hecho el {fechaFormateada}
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
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ width: "90%", textAlign: "justify" }}
                        >
                            {Data.Retroalimentacion}
                        </Typography>
                        <Box width={"90%"}>
                            <List component="nav">
                                {Data.Topicos.map((item, index) => (
                                    <ListItem key={index}>
                                        <Typography variant="body1">
                                            -
                                        </Typography>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Divider />

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
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const Rendimiento = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [IsLoadingPaginado1, setIsLoadingPaginado1] = useState(false);
    const [PaginasTotales, setPaginasTotales] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [MostrarRetro, setMostrarRetro] = useState(true)
    const [DataRendimiento, setDataRendimiento] = useState([]);
    const [Texto, setTexto] = useState("")
    const [Data, setData] = useState([]);
    const [isEnabled, setIsEnabled] = useState(true);
    
    let funcionalidad = 0;
    let legibilidad = 0;
    let eficiencia = 0;
    
    if (Data.length > 0) {
        for (const calificacion of Data) {
            let JSON_Calificaciones = calcularPromedio(calificacion.RespuestaLLM);
            funcionalidad = funcionalidad + JSON_Calificaciones.Funcionalidad;
            legibilidad = legibilidad + JSON_Calificaciones.Legibilidad;
            eficiencia = eficiencia + JSON_Calificaciones.Eficiencia;
        }
    
        funcionalidad = funcionalidad / Data.length;
        legibilidad = legibilidad / Data.length;
        eficiencia = eficiencia / Data.length;
    
    
    }
    

    
    let Promedio_Estudiante =
        ((funcionalidad + legibilidad + eficiencia) * 10) / 3;

    const handlePageChange = async (event, value) => {
        setCurrentPage(value);
        setIsLoadingPaginado1(true);
        const respu = await GET_Rendimiento_Estudiante({ pag: value });
        setDataRendimiento(respu.lista);
        setIsLoadingPaginado1(false);
    };

    useEffect(() => {
        async function handleRendimiento() {
            try {
                const respu = await Rendimiento_Estudiante();
                const respuGET = await GET_Rendimiento_Estudiante({ pag: 1 });
                const division = respuGET.cantidad / 5;
                const resultadoRedondeado = Math.ceil(division);
                setPaginasTotales(resultadoRedondeado);
                setDataRendimiento(respuGET.lista);
                
                if (respuGET.lista.length == 0) {
                    setTexto("No se han encontrado registro de que se haya hecho un analisis anteriormente")
                }else{
                    setTexto(respuGET.lista[respuGET.lista.length - 1].Retroalimentacion)
                }
                
                setData(respu.lista);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleRendimiento();
    }, []);
    const navigate = useNavigate();

    const handleAnalizar = async () => {
        setIsEnabled(false);
        if (Data.length < 5) {
            
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debido a que no ha resuelto los problemas mínimos para  hacer un análisis.",
            });
            setIsEnabled(true);
        }else{
            let lista_data = [];
            for (const elemento of Data) {
                for (const Item of elemento.RespuestaLLM) {
                    lista_data.push(Item.Retroalimentación);
                }
            }
            const respuesta = await Analisis_Rendimiento_Estudiante({
                Rendimiento: lista_data,
            });
            navigate("/estudiante/Rendimiento/Resultado", {
                state: {
                    ...respuesta,
                },
            });
        }
        
    };

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
                    Mi Rendimiento
                </Typography>
            </Box>
            <Box
            display="flex"
            alignItems="center"
            flexDirection= "column"

            justifyContent="center">


           
            <Box style={{width: "80vw" }}>

            

            <Paper
                sx={{
                    width: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Box
                                mt={2}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: 30 }}
                                    variant="body1"
                                >
                                    Promedio
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 45 }}
                                    variant="body1"
                                >
                                    {Math.ceil(Promedio_Estudiante)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            mt={4}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: 25 }}
                                    variant="body1"
                                >
                                    Funcionalidad
                                </Typography>

                                <Box mt={2}>
                                    <CircularWithValueLabel
                                        value={funcionalidad * 10}
                                        size={80}
                                    />
                                </Box>
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
                                <Typography
                                    sx={{ fontSize: 25 }}
                                    variant="body1"
                                >
                                    Legibilidad
                                </Typography>
                                <Box mt={2}>
                                    <CircularWithValueLabel
                                        value={legibilidad * 10}
                                        size={80}
                                    />
                                </Box>
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
                                <Typography
                                    sx={{ fontSize: 25 }}
                                    variant="body1"
                                >
                                    Eficiencia
                                </Typography>
                                <Box mt={2}>
                                    <CircularWithValueLabel
                                        value={eficiencia * 10}
                                        size={80}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            mt={5}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                                <Typography
                                sx={{ fontSize: 18 ,width: "70%", textAlign: "justify"}}
                                variant="body1"
                            >
                                {Texto}
                            </Typography>
                            

                        </Box>

                        <Box
                            mt={4}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleAnalizar}
                                disabled={!isEnabled}
                                sx={{
                                    m: 3,
                                    height: "50px",
                                    color: "white",
                                }}
                            >
                                <QueryStatsIcon
                                    sx={{ color: "white", mr: "5px" }}
                                />
                                Generar un analisis de mi rendimiento
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                            mt={5}
                        >
                            {IsLoadingPaginado1 ? (
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
                                    {DataRendimiento.map((jsonItem, index) => (
                                        <AccordionItem
                                            key={index}
                                            Data={jsonItem}
                                        />
                                    ))}
                                </div>
                            )}

                            <Box mt={2}>
                                <Pagination
                                    count={PaginasTotales}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    size="large"
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
            </Paper>
            </Box>
            </Box>
        </AppLayout>
    );
};
