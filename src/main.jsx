/**
 * @fileoverview Punto de entrada principal de la aplicación React.
 * Este archivo inicializa la aplicación React, configura el DOM root y
 * aplica los estilos globales necesarios (Material Design Bootstrap, FontAwesome, Roboto).
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Importación de estilos de Material Design Bootstrap
import "mdb-react-ui-kit/dist/css/mdb.min.css";
// Importación de iconos de FontAwesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// Importación de diferentes pesos de la fuente Roboto para Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

/**
 * Renderiza la aplicación React en el elemento DOM con id "root".
 * Se utiliza StrictMode para activar comprobaciones y advertencias adicionales
 * durante el desarrollo, ayudando a identificar problemas potenciales.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
