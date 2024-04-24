import { useState, useRef } from "react";
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
} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export const AdminCuentas = () => {
    const fileInputRef = useRef(null); // Referencia al input de tipo file
    const navigate = useNavigate();

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return; // Si no se selecciona ningún archivo, salimos
  
      // Mostrar el mensaje de confirmación usando SweetAlert2
      Swal.fire({
        title: '¿Estás seguro de subir este archivo?',
        text: `Nombre: ${file.name}\nTamaño: ${file.size} bytes`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, subir archivo',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            console.log(file);
            navigate("/profesor/CrearCuentas", {
                state: {
                    data: file,
                },
            });
        } else {
          // Acción cuando el usuario cancela
          Swal.fire('Operación cancelada', '', 'info');
          // Reiniciar el input de tipo file para permitir seleccionar otro archivo
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Limpiar el valor del input
          }
        }
      });
    };

    const handleDescargar = async () => {
        console.log("descargar");
    };
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
                        onClick={handleDescargar}
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
        </AppLayout>
    );
};
