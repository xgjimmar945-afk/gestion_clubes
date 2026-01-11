import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BotonBorrar from "./BotonBorrar";
import BotonEditar from "./BotonEditar";

import api from "../api";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function ListadoSocios() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchClubs() {
      try {
        let respuesta = await api.get("/clubs");

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setClubs(datos);
        } else {
          setError("Hubo un error al obtener los clubs");
        }
      } catch {
        setError("No pudimos hacer la solicitud de los clubs");
      }
    }

    fetchClubs();
  }, []);

  useEffect(() => {
    async function fetchSocios() {
      try {
        let response = await api.get("/socios");

        if (response.ok) {
          // Actualizamos los datos de Socios
          setDatos(response.datos);

          // Y no tenemos errores
          setError(null);
        } else {
          setError("Respuesta errónea del servidor.");
          setDatos(null);
        }
      } catch (e) {
        setError("No se pudo conectar al servidor: " + e.toString());
        setDatos(null);
      }
    }

    fetchSocios();
  }, []);

  if (error != null) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
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
          Listado de Socios
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
                Apellido
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Fecha Nacimiento
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Altura
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Cuota Pagada
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Club
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
                key={row.id_socio}
                sx={{ "&:hover": { bgcolor: "action.hover" } }}
              >
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.apellido}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.fecha_nacimiento}</TableCell>
                <TableCell>{row.altura_metros}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: row.ha_pagado_cuota
                        ? "success.main"
                        : "text.secondary",
                    }}
                  >
                    {row.ha_pagado_cuota ? "Sí" : "No"}
                  </Typography>
                </TableCell>
                <TableCell>
                  {clubs.find((club) => club.id_club === row.id_club)?.nombre}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <BotonEditar ruta="/socios/editar/" id={row.id_socio} />
                    <BotonBorrar ruta="/socios/" id={row.id_socio} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ListadoSocios;
