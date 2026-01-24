/**
 * @fileoverview Configuración del tema de Material UI para la aplicación.
 * Define los colores, tipografía y estilos para los modos claro y oscuro.
 */

import { createTheme } from "@mui/material/styles";

/**
 * Crea y retorna un tema de Material UI personalizado basado en el modo especificado.
 * 
 * El tema incluye:
 * - Paleta de colores personalizada para modo claro y oscuro
 * - Colores primarios y secundarios adaptados al modo
 * - Colores de fondo y superficie (paper) específicos
 * - Configuración de tipografía con la fuente Roboto
 * 
 * @param {('light'|'dark')} mode - El modo del tema ('light' para claro, 'dark' para oscuro)
 * @returns {import('@mui/material/styles').Theme} Tema de Material UI configurado
 * 
 * @example
 * const lightTheme = getTheme('light');
 * const darkTheme = getTheme('dark');
 */
export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            // Color primario: azul oscuro científico en modo claro, azul más brillante en modo oscuro
            primary: {
                main: mode === "light" ? "#002147" : "#095dbcff",
            },
            // Color secundario: cyan/turquesa, mismo en ambos modos
            secondary: {
                main: mode === "light" ? "#00ACC1" : "#00ACC1",
            },
            // Colores de fondo
            background: {
                default: mode === "light" ? "#f5f5f5" : "#121212", // Fondo general de la página
                paper: mode === "light" ? "#ffffff" : "#1e1e1e",   // Fondo de componentes elevados (cards, modals, etc.)
            },
        },
        // Configuración de tipografía
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontWeight: 700, // Negrita para títulos principales
            },
            h2: {
                fontWeight: 600, // Semi-negrita para subtítulos
            },
            h3: {
                fontWeight: 600, // Semi-negrita para encabezados de sección
            },
        },
    });

export default getTheme;
