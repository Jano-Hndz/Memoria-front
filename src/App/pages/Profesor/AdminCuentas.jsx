import { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    TextField,
    FormControlLabel,
    Checkbox,
    Input,
    CircularProgress,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
    CrearCuentasAlumnosHistorial,
    DesactivarCuentasAlumnos,
    ActivarCuentasAlumnos,
} from "../../../helpers/profesor_api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionItem = ({ Data }) => {
    const navigate = useNavigate();

    const [ActivaCuentas, setActivaCuentas] = useState(Data.Estado);

    const fecha = new Date(Data.Date);

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    const fechaFormateada = `  ${dia}-${mes}-${año}`;

    const handleDesactivar = async () => {
        const respu = await DesactivarCuentasAlumnos({
            id_creacion: Data._id,
        });
        Swal.fire({
            icon: "success",
            title: "Cuentas desactivadas",
            text: "Se desactivaron las cuentas correctamente",
        });
        setActivaCuentas(false);
    };

    const handleActivar = async () => {
        const respu = await ActivarCuentasAlumnos({
            id_creacion: Data._id,
        });
        Swal.fire({
            icon: "success",
            title: "Cuentas activadas",
            text: "Se activaron las cuentas correctamente",
        });

        setActivaCuentas(true);
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
                    sx={{ display: "flex", alignItems: "center", my: 3, ml: 3 }}
                >
                    <Typography sx={{ ml: 6, fontSize: 23 }}>
                        Cuentas creadas el
                        {fechaFormateada}
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
                <Box
                    flexDirection={"column"}
                    px={3}
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
                        }}
                        px={4}
                        flexDirection={"column"}

                    >
                        <Typography
                            sx={{
                                width: "90%",
                                textAlign: "justify",
                                fontSize: 18,
                            }}
                        >
                            Los usuarios a los que se les creo la cuenta en esta
                            fecha fueron:
                        </Typography>

                        <List component="nav">
                            {Data.lista_usuarios.map((item, index) => (
                                <ListItem key={index}>
                                    <Typography
                                        style={{
                                            fontSize: 18,
                                        }}
                                    >
                                        -
                                    </Typography>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        primary={item}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box
                        mt={3}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        {ActivaCuentas ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDesactivar}
                                sx={{
                                    width: "40vh",
                                    height: "50px",
                                }}
                            >
                                Desactivar Cuenta Usuarios
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleActivar}
                                sx={{
                                    width: "40vh",
                                    height: "50px",
                                }}
                            >
                                Activar Cuenta Usuarios
                            </Button>
                        )}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const AdminCuentas = () => {
    const fileInputRef = useRef(null); // Referencia al input de tipo file
    const navigate = useNavigate();
    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return; // Si no se selecciona ningún archivo, salimos

        // Mostrar el mensaje de confirmación usando SweetAlert2
        Swal.fire({
            title: "¿Estás seguro de subir este archivo?",
            text: `Nombre: ${file.name}\nTamaño: ${file.size} bytes`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, subir archivo",
            cancelButtonText: "No, cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/profesor/CrearCuentas", {
                    state: {
                        data: file,
                    },
                });
            } else {
                // Acción cuando el usuario cancela
                Swal.fire("Operación cancelada", "", "info");
                // Reiniciar el input de tipo file para permitir seleccionar otro archivo
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Limpiar el valor del input
                }
            }
        });
    };

    useEffect(() => {
        async function handleHistorial() {
            try {
                const respu = await CrearCuentasAlumnosHistorial({ pag: 1 });
                setData(respu.lista);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handleHistorial();
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
                    Administrar cuentas estudiantes
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch", // Estirar los elementos verticalmente para igualar la altura
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Box sx={{ flex: 1, maxWidth: "40vh", padding: "0 8px" }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            height: "100%",
                        }}
                        target="_blank"
                        href="https://drive.google.com/uc?id=1NRYEcp-KxhONcuth8IKoUocBckRD_5Nf"
                        startIcon={<DownloadIcon />}
                    >
                        Descargar plantilla
                    </Button>
                </Box>

                <Box sx={{ flex: 1, maxWidth: "40vh", padding: "0 8px" }}>
                    <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        style={{ display: "none" }} // Ocultar el input, pero seguirá siendo funcional
                    />
                    <label htmlFor="file-upload">
                        <Button
                            component="span"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ height: "100%" }}
                            startIcon={<FileUploadIcon />}
                        >
                            Subir Archivo
                        </Button>
                    </label>
                </Box>
            </Box>

            <Box
                m={4}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {" "}
                {isLoading ? (
                    <Box>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div>
                        {Data.map((jsonItem, index) => (
                            <Box key={index} mt={1}>
                                <AccordionItem Data={jsonItem} />
                            </Box>
                        ))}
                    </div>
                )}
            </Box>
        </AppLayout>
    );
};
