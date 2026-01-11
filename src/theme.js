import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#002147", // Deep Blue (Depth/Space)
            },
            secondary: {
                main: "#00ACC1", // Teal/Cyan (Science/Cleanliness)
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
