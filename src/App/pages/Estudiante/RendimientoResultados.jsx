import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import { getData } from "../../../helpers/funciones";
import { AppLayout } from "../../layout/AppLayout";

export const RendimientoResultados = () => {
    const data = getData();

    console.log(data);

    const handleResolverProblema = async () => {
        console.log("Problema");
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
                    Resultado analisis de rendimiento
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
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleResolverProblema}
                        sx={{ width: "20%", marginBottom: "1%" }}
                    >
                        Resolver problema generado
                    </Button>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Box mt={2} px={4}>
                            <Typography
                                sx={{ fontSize: 20, textAlign: "justify" }}
                            >
                                {data.retroalimentacion.Retroalimentacion}
                            </Typography>

                            <Typography sx={{ fontSize: 20 }}>
                                Los tópicos con los cuales has tenido más
                                problema son:
                            </Typography>

                            <List component="nav">
                                {data.retroalimentacion.lista_topicos.map(
                                    (item, index) => (
                                        <ListItem key={index}>
                                            <Typography
                                                style={{
                                                    fontSize: 20,
                                                    marginRight: 8,
                                                }}
                                            >
                                                -
                                            </Typography>
                                            <ListItemText
                                                primaryTypographyProps={{
                                                    style: { fontSize: 20 },
                                                }}
                                                primary={item}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </AppLayout>
    );
};
