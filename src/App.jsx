// Importacion de componentes
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router";
import Inicio from "./components/Inicio";
import AltaClub from "./components/AltaClub";

// Importacion de pages 
import Home from "./pages/Home";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
      children: [
        // Todo esto se ve en el Outlet
        { index: true, Component: Inicio }, // Esto se ve en la ruta padre
        /* {
          path: "/directors",
          element: <ListadoDirectores/>,
        }, */
        {
          path: "/clubs/new",
          element: <AltaClub/>,
        },
        {
          path: "/clubs",
          element: <ListadoClubes/>,
        },
        /* {
          path: "/movies",
          element: <h1>Listado de peliculas</h1>,
        },
        {
          path: "/movies/new",
          element: <h1>Alta de peliculas</h1>,
        }, */ 
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
