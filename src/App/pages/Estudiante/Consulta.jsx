import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Consulta_ChatGPT } from "../../../helpers/estudiante_api";
import { AppLayout } from "../../layout/AppLayout";
import VeraMono from '../../../fonts/VeraMono.ttf'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export const Consulta = () => {
    const [inputValue, setInputValue] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        setIsEnabled(false);
        const respuesta = await Consulta_ChatGPT({ consulta: inputValue });
        navigate("/estudiante/resolucion", {
            state: {
                lista: respuesta.resp,
                problema: inputValue,
                id_consulta: respuesta.id_consulta,
                Propuesto: false,
            },
        });
    };

    const handleVideoRedirect = () => {
        window.open('https://youtu.be/ljqiwA1pPq4', '_blank');
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
                        fontSize: '1rem', // Ajustar tamaño del texto del botón
                        padding: '12px 24px',
                        color: 'black', 
                        fontFamily: {VeraMono}
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
                    Consulta
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
                    width={"70%"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        id="outlined-multiline-static"
                        label="Escriba el problema a enseñar"
                        multiline
                        rows={12}
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: "100%" }}
                        disabled={!isEnabled}
                    >
                        <SendIcon sx={{ color: "white", mr: "5px" }} />
                        Enviar
                    </Button>

                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleVideoRedirect}
                    sx={{ width: "100%" }}
                >
                    <PlayCircleIcon sx={{ color: "white", mr: "5px" }} />
                    Ver Video Tutorial
                </Button>
                </Box>
            </Paper>
        </AppLayout>
    );
};
