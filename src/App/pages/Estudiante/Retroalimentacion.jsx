import Editor from "@monaco-editor/react";
import {
    Box,
    Container,
    Grid,
    Paper,
    Rating,
    Typography,
    Button,
} from "@mui/material";
import { calcularPromedio, getData } from "../../../helpers/funciones";
import { AppLayout } from "../../layout/AppLayout";
import { CircularWithValueLabel } from "../../../helpers/CircularWithValueLabel";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import VeraMono from '../../../fonts/VeraMono.ttf'

export const Retroalimentacion = () => {
    const data_get = getData();
    const inputs = data_get.inputs;
    const navigate = useNavigate();

    const retroalimentaciones = data_get.retroalimentacion;
    const lista_funciones = data_get.lista_funciones;
    let json_retro = null;

    function buscarPorNombre(nombre) {
        for (let i = 0; i < retroalimentaciones.length; i++) {
            if (retroalimentaciones[i].Nombre == nombre) {
                return retroalimentaciones[i];
            }
        }
        return null;
    }

    const JSON_Calificaciones = calcularPromedio(retroalimentaciones);

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
                        fontSize: "1rem",
                        padding: "12px 24px",
                        color: "black",
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
                    Retroalimentación
                </Typography>
            </Box>

            <Paper
                sx={{
                    width: "100%",
                    px: 5,
                    py: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box sx={{ border: 1, borderColor: "primary.main", p: 2 }}>
                    {data_get.problema}
                </Box>
                {lista_funciones.map((jsonItem, index) => {
                    json_retro = buscarPorNombre(jsonItem.Nombre);
                    return (
                        <Container
                            key={jsonItem.Nombre}
                            sx={{ borderBottom: "1px solid #ccc" }}
                        >
                            <Box my={"3%"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="body1">
                                                    Nombre:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={10} mt={2}>
                                                <Typography
                                                    variant="body1"
                                                    mb={2}
                                                >
                                                    {jsonItem.Nombre}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="body1">
                                                    Descripción:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={10}>
                                                <Typography variant="body1">
                                                    {jsonItem.Descripcion}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="body1">
                                                    Input:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={10}>
                                                <Typography variant="body1">
                                                    {jsonItem.Input}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="body1">
                                                    Output:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={10}>
                                                <Typography variant="body1">
                                                    {jsonItem.Output}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                mb={"3%"}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Editor
                                    height="30vh"
                                    language="python"
                                    theme="vs-dark"
                                    value={inputs[jsonItem.Nombre] || ""}
                                    options={{ readOnly: true }}
                                />
                            </Box>
                            <Box width={"100%"} my={"3%"}>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            sx={{ textAlign: "center" }}
                                        >
                                            <Typography
                                                sx={{ fontSize: 20 }}
                                                variant="body1"
                                            >
                                                Funcionalidad
                                            </Typography>

                                            <Box mt={2}>
                                                <CircularWithValueLabel
                                                    value={
                                                        json_retro.Funcionalidad *
                                                        10
                                                    }
                                                    size={70}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            sx={{ textAlign: "center" }}
                                        >
                                            <Typography
                                                sx={{ fontSize: 20 }}
                                                variant="body1"
                                            >
                                                Legibilidad
                                            </Typography>
                                            <Box mt={2}>
                                                <CircularWithValueLabel
                                                    value={
                                                        json_retro.Legibilidad *
                                                        10
                                                    }
                                                    size={70}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            sx={{ textAlign: "center" }}
                                        >
                                            <Typography
                                                sx={{ fontSize: 20 }}
                                                variant="body1"
                                            >
                                                Eficiencia
                                            </Typography>
                                            <Box mt={2}>
                                                <CircularWithValueLabel
                                                    value={
                                                        json_retro.Eficiencia *
                                                        10
                                                    }
                                                    size={70}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="body1">
                                                    Retroalimentación:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={10}>
                                                <Typography variant="body1">
                                                    {
                                                        json_retro.Retroalimentación
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    );
                })}

                <Box my={10} mb={5} sx={{ textAlign: "center" }}>
                    <Typography
                        variant="h2"
                        fontWeight={500}
                        fontSize={{ xs: 30, md: 50 }}
                    >
                        Calificación final
                    </Typography>
                </Box>

                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: 20 }} variant="body1">
                            Funcionalidad
                        </Typography>
                        <Box mt={2}>
                            <CircularWithValueLabel
                                value={JSON_Calificaciones.Funcionalidad * 10}
                                size={80}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: 20 }} variant="body1">
                            Legibilidad
                        </Typography>

                        <Box mt={2}>
                            <CircularWithValueLabel
                                value={JSON_Calificaciones.Legibilidad * 10}
                                size={80}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: 20 }} variant="body1">
                            Eficiencia
                        </Typography>

                        <Box mt={2}>
                            <CircularWithValueLabel
                                value={JSON_Calificaciones.Eficiencia * 10}
                                size={80}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    mt={5}
                    width={"100%"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/home")}
                        style={{
                            fontSize: "1rem",
                            padding: "12px 24px",
                            display: "flex",
                            alignItems: "center",
                            width: "30%",
                        }}
                    >
                        <HomeIcon />
                        <span style={{ marginLeft: "5px" }}>Volver</span>
                    </Button>
                </Box>
            </Paper>
        </AppLayout>
    );
};
