import {useState,useRef } from 'react';
import { Box, Typography, Button,Paper,TextField} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import {Agregar_Ejercicio} from "../../../helpers/profesor_api"
import { useNavigate } from 'react-router-dom';



export const AgregarEjercicio = () => {
    const [inputValue, setInputValue] = useState("");
    const [Titulo, setTitulo] = useState("")
    const [isEnabled, setIsEnabled] = useState(true);
    const navigate = useNavigate();


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

    const handleSubmit = async(event) => {
        setIsEnabled(false)
        const respuesta= await Agregar_Ejercicio({
            Titulo:Titulo,
            Problema:inputValue
        })
        navigate("/profesor/EjerciciosPropuestos",{
            state: {
                mostrar: true
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
                

                <Box width={"70%"} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Escriba un titulo para el problema"
                        rows={1}
                        sx={{ width: "100%", marginBottom: '1rem' }}
                        value={Titulo}
                        onChange={handleTituloChange}
                        />
                    <TextField
                        id="outlined-multiline-static"
                        label="Escriba el problema"
                        multiline
                        rows={12}
                        sx={{ width: "100%", marginBottom: '1rem' }}
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
                        Enviar
                    </Button>
                </Box >
                

            </Paper>
        </AppLayout>
    );
};
