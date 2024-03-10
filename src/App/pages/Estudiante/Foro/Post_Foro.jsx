import { useState, useRef } from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { AppLayout } from "../../../layout/AppLayout";
import { Consulta_ChatGPT } from "../../../../helpers/estudiante_api";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../../helpers/funciones";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ComentarForo } from "../../../../helpers/foro_api";
import ChatIcon from "@mui/icons-material/Chat";


const ComentarioItem = ({ Data }) => {
    const navigate = useNavigate();
    console.log(Data);


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
                                    {Data.Usuario}: {Data.Comentario}
                                </Typography>
                                <Typography sx={{ ml: 6, fontSize: 18 }}>
                                    {Data.Usuario}: {Data.Comentario}
                                </Typography>

                    </Paper>
    );
};


export const Post_Foro = () => {
    const Data = getData();
    console.log(Data);
    const [inputValue, setInputValue] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);


    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        setIsEnabled(false);
        const respu = await ComentarForo({
            ForoID:Data._id,
            Comentario:inputValue
        });
        setIsEnabled(true);
        
    };

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
                            </Grid>
                        </Grid>
                    </Paper>

                    {(Data.comentarios).map((jsonItem, index) => (
                        <Box key={index} mb={1}>
                            <ComentarioItem Data={jsonItem} />
                        </Box>
                    ))}




                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        sx={{ width: "100%" }}
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: "100%", height: "50px" }}
                        disabled={!isEnabled}
                    >
                        Comentar
                    </Button>


        </AppLayout>
    );
};
