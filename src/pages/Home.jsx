/**
 * @fileoverview Componente de layout principal de la aplicación.
 * Proporciona la estructura base con Navbar, contenido y Footer.
 */

import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";

/**
 * Componente de layout principal que envuelve todas las páginas.
 *
 * Estructura:
 * - Navbar: Barra de navegación superior fija
 * - Main: Área de contenido principal (renderiza las rutas hijas mediante Outlet)
 * - Footer: Pie de página fijo al final
 *
 * Utiliza Flexbox para mantener el footer siempre al final de la página,
 * incluso cuando el contenido es menor que la altura de la ventana.
 *
 * @component
 * @returns {JSX.Element} Layout principal con navegación, contenido y footer
 */
function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
