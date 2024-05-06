import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CambiarContrasena } from "../../../helpers/estudiante_api";
import { AppLayout } from "../../layout/AppLayout";
import Swal from "sweetalert2";
import { TrendingUp } from "@mui/icons-material";
import VeraMono from '../../../fonts/VeraMono.ttf'

export const Configuraciones = () => {
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPassword1Change = (event) => {
        setNewPassword1(event.target.value);
    };

    const handleNewPassword2Change = (event) => {
        setNewPassword2(event.target.value);
    };

    const handleSubmit = async () => {
        if (newPassword1 !== newPassword2) {
            Swal.fire("Error", "Las contraseñas nuevas no coinciden", "error");
            return;
        }

        if (
            newPassword1.length < 8 ||
            !/\d/.test(newPassword1) ||
            !/[a-zA-Z]/.test(newPassword1)
        ) {
            Swal.fire(
                "Error",
                "La contraseña nueva debe tener al menos 8 caracteres, una letra y un número",
                "error"
            );
            return;
        }
        const respu = await CambiarContrasena({
            constrasenaantigua: oldPassword,
            newPassword: newPassword1,
        });

        if (respu.ok) {
            Swal.fire("Contraseña cambiada correctamente", "", "success");
        } else {
            Swal.fire("Error", "La contraseña antigua es incorrecta.", "error");
        }
    };

    const isEnabled =
        oldPassword.trim() !== "" &&
        newPassword1.trim() !== "" &&
        newPassword2.trim() !== "";

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
                        fontSize: "1rem", // Ajustar tamaño del texto del botón
                        padding: "12px 24px",
                        color: "black", // Ajustar espacio alrededor del texto del botón
                        fontFamily: {VeraMono},
                    }}
                >
                    Volver
                </Button>
                <Typography
                    variant="h2"
                    fontWeight={500}
                    fontSize={{ xs: 30, md: 50 }}
                    sx={
                        {
                            fontFamily: {VeraMono}
                        }
                    }
                >
                    Configuraciones
                </Typography>
            </Box>
            

            <Paper
                sx={{
                    width: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    width={"50%"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        id="oldPassword"
                        type="password"
                        label="Contraseña antigua"
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                    />

                    <TextField
                        id="newPassword1"
                        type="password"
                        label="Nueva contraseña"
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={newPassword1}
                        onChange={handleNewPassword1Change}
                    />

                    <TextField
                        id="newPassword2"
                        type="password"
                        label="Confirmar nueva contraseña"
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={newPassword2}
                        onChange={handleNewPassword2Change}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: "100%" }}
                        disabled={!isEnabled}
                    >
                        Cambiar contraseña
                    </Button>
                </Box>
            </Paper>
        </AppLayout>
    );
};
