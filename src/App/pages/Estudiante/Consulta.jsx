import {useState } from 'react';
import { Box, Typography, Button,Paper,TextField} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import {Consulta_ChatGPT} from "../../../helpers/estudiante_api"


export const Consulta = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async(event) => {
        console.log("Valor del campo de texto:", inputValue);
        const resp= await Consulta_ChatGPT({consulta:inputValue})
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

                <Box width={"70%"} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Escriba el problema a enseñar"
                        multiline
                        rows={12}
                        sx={{ width: "90%", marginBottom: '1rem' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: "100%" }}
                    >
                        Enviar
                    </Button>
                </Box>
                

            </Paper>
        </AppLayout>
    );
};
