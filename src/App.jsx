/**
 * @fileoverview Componente raíz de la aplicación que configura el enrutamiento,
 * el sistema de temas (claro/oscuro) y los providers globales.
 */

// Importación de dependencias de React y hooks
import React, { useState, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Importación de componentes de la aplicación
import LandingPage from "./components/LandingPage";
import AltaClub from "./components/AltaClub";
import AltaSocio from "./components/AltaSocio";
import ListadoClubs from "./components/ListadoClubs";
import ListadoSocios from "./components/ListadoSocios";
import EditarSocio from "./components/EditarSocio";
import BusquedaClub from "./components/BusquedaClub";
import BusquedaSocio from "./components/BusquedaSocio";
import ListadoSociosFecha from "./components/ListadoSociosFecha";
import GraficaClubs from "./components/GraficaClubs";
import EditarClub from "./components/EditarClub";

// Importación de páginas
import Home from "./pages/Home";

// Importación de contexto y configuración de tema
import { ColorModeContext } from "./context/ColorModeContext";
import { getTheme } from "./theme";

/**
 * Componente principal de la aplicación.
 * Gestiona el estado del tema (claro/oscuro), configura el enrutamiento
 * y proporciona los contextos necesarios para toda la aplicación.
 *
 * @component
 * @returns {JSX.Element} Aplicación completa con providers y enrutamiento configurado
 */
function App() {
  // Estado para controlar el modo de color (light/dark)
  const [mode, setMode] = useState("light");

  /**
   * Objeto memoizado que proporciona la función para alternar entre modo claro y oscuro.
   * Se memoiza para evitar recrear el objeto en cada render, optimizando el rendimiento.
   *
   * @type {{toggleColorMode: Function, mode: string}}
   */
  const colorMode = useMemo(
    () => ({
      /**
       * Alterna entre modo claro y oscuro
       */
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode],
  );

  /**
   * Tema de Material UI generado dinámicamente basado en el modo actual.
   * Se memoiza para evitar regenerar el tema en cada render.
   */
  const theme = useMemo(() => getTheme(mode), [mode]);

  /**
   * Configuración de rutas de la aplicación usando React Router v6.
   * Estructura:
   * - "/" (Home) - Layout principal con Navbar y Footer
   *   - "/" (index) - Landing page
   *   - "/clubs/*" - Rutas relacionadas con clubes (crear, listar, editar, buscar, gráfica)
   *   - "/socios/*" - Rutas relacionadas con socios (crear, listar, editar, buscar, filtrar por fecha)
   */
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
      children: [
        // Ruta raíz - Landing page
        { index: true, Component: LandingPage },

        // Rutas de Clubes
        {
          path: "/clubs/new",
          element: <AltaClub />,
        },
        {
          path: "/clubs",
          element: <ListadoClubs />,
        },
        {
          path: "/clubs/editar/:id",
          element: <EditarClub />,
        },
        {
          path: "/clubs/buscar",
          element: <BusquedaClub />,
        },
        {
          path: "/clubs/graph",
          element: <GraficaClubs />,
        },

        // Rutas de Socios
        {
          path: "/socios/new",
          element: <AltaSocio />,
        },
        {
          path: "/socios",
          element: <ListadoSocios />,
        },
        {
          path: "/socios/editar/:id",
          element: <EditarSocio />,
        },
        {
          path: "/socios/buscar",
          element: <BusquedaSocio />,
        },
        {
          path: "/socios/fecha",
          element: <ListadoSociosFecha />,
        },
      ],
    },
  ]);

  return (
    // Provider del contexto de modo de color (permite a componentes hijos cambiar el tema)
    <ColorModeContext.Provider value={colorMode}>
      {/* Provider del tema de Material UI */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline normaliza los estilos CSS entre navegadores */}
        <CssBaseline />
        {/* Router principal de la aplicación */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
