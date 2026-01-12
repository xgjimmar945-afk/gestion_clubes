import { createTheme } from "@mui/material/styles";

// Funcion que crea el tema segun el modo (light o dark) para todos los componentes
export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === "light" ? "#002147" : "#095dbcff",
            },
            secondary: {
                main: mode === "light" ? "#00ACC1" : "#00ACC1",
            },
            background: {
                default: mode === "light" ? "#f5f5f5" : "#121212",
                paper: mode === "light" ? "#ffffff" : "#1e1e1e",
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 600,
            },
            h3: {
                fontWeight: 600,
            },
        },
    });

export default getTheme;
