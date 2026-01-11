// Importacion de componentes
import React, { useState, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./components/LandingPage";
import AltaClub from "./components/AltaClub";
import AltaSocio from "./components/AltaSocio";
import ListadoClubs from "./components/ListadoClubs";
import ListadoSocios from "./components/ListadoSocios";
import EditarSocio from "./components/EditarSocio";
import BusquedaClub from "./components/BusquedaClub";
import BusquedaSocio from "./components/BusquedaSocio";
import { ColorModeContext } from "./context/ColorModeContext";
import { getTheme } from "./theme";

// Importacion de pages
import Home from "./pages/Home";
import EditarClub from "./components/EditarClub";

function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
      children: [
        { index: true, Component: LandingPage },
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
      ],
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
