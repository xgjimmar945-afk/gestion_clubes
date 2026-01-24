/**
 * @fileoverview Componente de pie de página de la aplicación.
 * Muestra información de copyright y branding.
 */

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

/**
 * Componente de pie de página (footer) de la aplicación.
 *
 * Características:
 * - Fondo con color primario del tema
 * - Texto en blanco para contraste
 * - Copyright dinámico con año actual
 * - Posicionamiento automático al final de la página
 *
 * @component
 * @returns {JSX.Element} Pie de página de la aplicación
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Clubes de Ciencia - Explorando el Conocimiento
        </Typography>
        <Typography variant="body2" color="inherit" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            ClubesCiencia
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
