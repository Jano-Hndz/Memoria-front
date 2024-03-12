import { useState, useRef } from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";



export const EjerciciosPropuestos = () => {

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
                    Ejercicios Propuestos
                </Typography>
            </Box>

        </AppLayout>
    );
};
