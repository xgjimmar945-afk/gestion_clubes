/**
 * @fileoverview Componente para mostrar el listado completo de clubes.
 * Incluye funcionalidad de edición, eliminación e impresión.
 */

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import DownloadIcon from "@mui/icons-material/Download";
import BotonBorrar from "./BotonBorrar";
import BotonEditar from "./BotonEditar";

import api from "../api";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import styles from "../css/Impresion.module.css";

/**
 * Componente de listado de todos los clubes del sistema.
 *
 * Funcionalidades:
 * - Tabla con todos los clubes y su información completa
 * - Botones de acción para editar y eliminar cada club
 * - Botón flotante para imprimir el listado
 * - Manejo de errores de carga
 * - Resolución de nombres de ramas desde el catálogo
 *
 * @component
 * @returns {JSX.Element} Tabla de listado de clubes
 */
function ListadoClubs() {
  // Lista de clubes obtenida del backend
  const [datos, setDatos] = useState([]);
  // Estado para manejar errores de carga de clubes
  const [error, setError] = useState(null);

  // Estado para la rama seleccionada (usado para resolver nombres)
  const [rama, setRama] = useState("");
  // Lista de todas las ramas para mostrar nombres en lugar de IDs
  const [ramas, setRamas] = useState([]);
  // Estado para manejar errores de carga de ramas
  const [isError, setIsError] = useState(null);

  /**
   * Effect para cargar las ramas disponibles al montar el componente.
   * Las ramas se usan para mostrar el nombre en lugar del ID en la tabla.
   */
  useEffect(() => {
    async function fetchRamas() {
      try {
        const respuesta = await api.get("/ramas");

        if (respuesta.ok) {
          const datos = respuesta.datos;
          setRamas(datos);
          if (datos.length > 0) {
            setRama(datos[0].id_rama);
          }
        } else {
          setIsError("Hubo un error al obtener las temáticas");
        }
      } catch (error) {
        setIsError(
          error.mensaje || "No pudimos hacer la solicitud de las temáticas",
        );
      }
    }

    fetchRamas();
  }, []);

  /**
   * Effect para cargar todos los clubes al montar el componente.
   * Maneja errores y actualiza el estado correspondiente.
   */
  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await api.get("/clubs");

        if (response.ok) {
          setDatos(response.datos);
          setError(null);
        } else {
          setError(response.mensaje || "Respuesta errónea del servidor.");
          setDatos([]);
        }
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchClubs();
  }, []);

  // Mostrar mensaje de error si hubo problemas al cargar los datos
  if (error != null) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3, bgcolor: "#ffebee" }}>
          <Typography variant="h5" color="error" align="center">
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Listado de Clubs
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Descripción
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Dirección
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Fecha Fundación
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Rama Científica
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Presupuesto
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Activo
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((row) => (
              <TableRow
                key={row.id_club}
                sx={{ "&:hover": { bgcolor: "action.hover" } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "medium" }}
                >
                  {row.nombre}
                </TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.direccion}</TableCell>
                <TableCell>{row.fecha_fundacion}</TableCell>
                <TableCell>
                  <Paper
                    variant="outlined"
                    sx={{
                      px: 1,
                      py: 0.5,
                      bgcolor: "background.default",
                      textAlign: "center",
                    }}
                  >
                    {ramas.find((rama) => rama.id_rama === row.id_rama)
                      ?.nombre_rama || "N/A"}
                  </Paper>
                </TableCell>
                <TableCell>${row.presupuesto_anual}</TableCell>
                <TableCell>
                  {row.esta_activo ? (
                    <Typography color="success.main" fontWeight="bold">
                      Sí
                    </Typography>
                  ) : (
                    <Typography color="text.secondary">No</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <BotonEditar ruta="/clubs/editar/" id={row.id_club} />
                    <BotonBorrar ruta="/clubs/" id={row.id_club} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        className={styles.noprint}
        color="secondary"
        aria-label="imprimir"
        onClick={() => window.print()}
        sx={{
          position: "fixed",
          top: 85,
          right: 20,
        }}
      >
        <DownloadIcon />
      </Fab>
    </Container>
  );
}

export default ListadoClubs;
