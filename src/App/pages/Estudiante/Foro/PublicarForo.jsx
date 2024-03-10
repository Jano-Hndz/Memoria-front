import { useState, useRef } from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { AppLayout } from "../../../layout/AppLayout";
import { Consulta_ChatGPT } from "../../../../helpers/estudiante_api";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../../helpers/funciones";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Publicar_Foro} from "../../../../helpers/foro_api";



export const PublicarForo = () => {
    const [inputValue, setInputValue] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const navigate = useNavigate();
    const { Data } = getData();

    const handleVerRetoalimentacion = async () => {
        navigate("/estudiante/retroalimentacion", {
            state: {
                inputs: Data.Respuesta_Estudiante,
                retroalimentacion: Data.Retroalimentacion,
                lista_funciones: JSON.parse(Data.RespuestaSubojetivos),
                problema: Data.Problema,
            },
        });
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        setIsEnabled(false);
        const respu = await Publicar_Foro({
            Comentario:inputValue,
            RetroalimentacionID:Data.id_retroalimento
        });
        setIsEnabled(true);
        
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
                    Publicar en Foro
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
                        rows={8}
                        sx={{ width: "100%" }}
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                    <Paper
                        sx={{
                            width: "100%",
                            p: 2,
                            my: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                                <Typography sx={{ ml: 6, fontSize: 18 }}>
                                    {Data.Titulo}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: "70%",
                                        m: 3,
                                        color: "white",
                                    }}
                                    onClick={handleVerRetoalimentacion}
                                    startIcon={
                                        <VisibilityIcon
                                            style={{ color: "white" }}
                                        />
                                    }
                                >
                                    Ver
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: "100%", height: "50px" }}
                        disabled={!isEnabled}
                    >
                        Publicar
                    </Button>
                </Box>
            </Paper>
        </AppLayout>
    );
};
