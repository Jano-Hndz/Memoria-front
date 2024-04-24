import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Agregar_Ejercicio} from "../../../helpers/profesor_api";
import { AppLayout } from "../../layout/AppLayout";

export const AgregarEjercicio = () => {
    const [inputValue, setInputValue] = useState("");
    const [Titulo, setTitulo] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const navigate = useNavigate();

    const handleTagInputChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

    const handleSubmit = async (event) => {
        setIsEnabled(false);
        const respuesta = await Agregar_Ejercicio({
            Titulo: Titulo,
            Problema: inputValue,
            Tags: tags,
        });
        navigate("/profesor/EjerciciosPropuestos", {
            state: {
                mostrar: true,
            },
        });
    };

    const handleTagInputKeyPress = (event) => {
        if (event.key === "Enter" && tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
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
                    Agregar Ejercicio
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
                        label="Escriba un titulo para el problema"
                        rows={1}
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={Titulo}
                        onChange={handleTituloChange}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Escriba el problema"
                        multiline
                        rows={12}
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                style={{
                                    marginRight: "0.5rem",
                                    marginTop: "0.5rem",
                                }}
                                variant="outlined"
                                onDelete={() => handleDelete(index)}
                            />
                        ))}
                    </Box>

                    <TextField
                        id="outlined-multiline-static"
                        label="Agregar etiquetas (presiona Enter para agregar)"
                        sx={{ width: "100%", marginBottom: "1rem" }}
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyPress={handleTagInputKeyPress}
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
                </Box>
            </Paper>
        </AppLayout>
    );
};
