import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    TextField,
    Paper,
    Grid,
    Container,
    Tooltip,
    InputAdornment
} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import Editor from "@monaco-editor/react";
import { Revision_ChatGPT } from "../../../helpers/estudiante_api";
import { getData } from "../../../helpers/funciones";
import InfoIcon from "@mui/icons-material/Info";

export const Resolucion = () => {
    const [inputs, setInputs] = useState({});
    const [isEnabled, setIsEnabled] = useState(true);
    const [Titulo, setTitulo] = useState("");

    const navigate = useNavigate();

    const handleChangeTitulo = (event) => {
        setTitulo(event.target.value);
    };

    const handleInputChange = (nombre, valor) => {
        setInputs((prevState) => ({
            ...prevState,
            [nombre]: valor,
        }));
    };

    const data_get = getData();
    const lista_funciones = JSON.parse(data_get.lista);
    console.log(data_get.id_consulta);


    const handleSubmit = async (event) => {
        setIsEnabled(false);
        const inputs_string = JSON.stringify(inputs);
        const input_formateo = inputs_string
            .replace(/,/g, ",\n")
            .replace(/\\r\\n/g, "\n");
        const respuesta = await Revision_ChatGPT({
            requested: data_get.lista,
            responded: inputs,
            id_consulta: data_get.id_consulta,
            titulo:Titulo
        });
        setIsEnabled(true);
        navigate("/estudiante/retroalimentacion", {
            state: {
                inputs: inputs,
                retroalimentacion: respuesta,
                lista_funciones: lista_funciones,
                problema: data_get.problema,
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
                    Manos a la Obra
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
                
                <TextField
                    id="outlined-multiline-static"
                    label="Escriba un titulo para el problema"
                    multiline
                    rows={1}
                    sx={{ width: "60%", marginBottom: "1rem" }}
                    value={Titulo}
                    onChange={handleChangeTitulo}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Este titulo sera util para poder identificar cada consulta en la sección del historial.">
                                    <InfoIcon />
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                />


                <Box sx={{ border: 1, borderColor: "primary.main", p: 2 }}>
                    {data_get.problema}
                </Box>

                {lista_funciones.map((jsonItem, index) => (
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
                                            <Typography variant="body1" mb={2}>
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
                                onChange={(value) =>
                                    handleInputChange(jsonItem.Nombre, value)
                                }
                            />
                        </Box>
                    </Container>
                ))}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ width: "100%" }}
                    disabled={!isEnabled}
                >
                    Revisar
                </Button>
            </Paper>
        </AppLayout>
    );
};
