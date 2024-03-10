import { useState, useRef } from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { AppLayout } from "../../../layout/AppLayout";
import { Consulta_ChatGPT } from "../../../../helpers/estudiante_api";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../../helpers/funciones";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Get_Retroalimentacion,PostForo } from "../../../../helpers/foro_api";
import ChatIcon from '@mui/icons-material/Chat';

const ForoItem = ({ Data }) => {
    const navigate = useNavigate();

    const handleVer_ejercicio = async (event) => {
        const respu = await Get_Retroalimentacion({
            RetroalimentacionID:Data.RetroalimentacionID
        });
        navigate("/estudiante/retroalimentacion", {
            state: {
                ...respu
            },
        });
    };


    const handleComentar = async (event) => {
        const respu = await PostForo({
            id_foro:Data._id
        });
        navigate("/estudiante/Post_Foro", {
            state: {
                ...Data,
                comentarios:respu
            },
        });
    };


    return (

        <Paper
                        sx={{
                            width: "100%",
                            p: 2,
                            my: 2,
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                        }}
                    >

                                <Typography sx={{ ml: 6, fontSize: 18 }}>
                                    {Data.Usuario}:
                                </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                                <Typography sx={{ ml: 6, fontSize: 18 }}>
                                    {Data.Comentario}
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
                                    onClick={handleVer_ejercicio}
                                    startIcon={
                                        <VisibilityIcon
                                            style={{ color: "white" }}
                                        />
                                    }
                                >
                                    Ver ejercicio
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: "70%",
                                        m: 3,
                                        color: "white",
                                    }}
                                    onClick={handleComentar}
                                    startIcon={
                                        <ChatIcon
                                            style={{ color: "white" }}
                                        />
                                    }
                                >
                                    Comentarios
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
    );
};

export const Foro = () => {
    const { Data } = getData();

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
                    Foro
                </Typography>
            </Box>

            {Data.map((jsonItem, index) => (
                <Box key={index} mb={1}>
                    <ForoItem Data={jsonItem} />
                </Box>
            ))}
        </AppLayout>
    );
};
