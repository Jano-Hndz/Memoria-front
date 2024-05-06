import { useEffect, useState } from "react";
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
import { getData } from "../../../helpers/funciones";
import {CrearCuentasAlumnos} from "../../../helpers/profesor_api"

export const CrearCuentas = () => {
    const data = getData();


    async function handleSubirArchivo() {
        try {
            let formData = new FormData();
            formData.append('file', data.data);

            const respu = await CrearCuentasAlumnos(formData);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleSubirArchivo();
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
                    Crear Cuentas
                </Typography>
            </Box>
            
        </AppLayout>
    );
};
