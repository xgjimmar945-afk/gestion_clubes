import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/es";

import api from "../api";
import BotonEditar from "./BotonEditar";
import BotonBorrar from "./BotonBorrar";

function ListadoSociosFecha() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchClubs() {
      try {
        let respuesta = await api.get("/clubs");
        if (respuesta.ok) {
          setClubs(respuesta.datos);
        }
      } catch {
        console.error("Error al cargar clubes");
      }
    }
    fetchClubs();
  }, []);

  const handleBuscar = async () => {
    if (!fechaInicio || !fechaFin) {
      setError("Por favor, selecciona ambas fechas.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fInicio = fechaInicio.format("YYYY-MM-DD");
      const fFin = fechaFin.format("YYYY-MM-DD");

      const response = await api.get(
        `/socios/rango-fecha?fechaInicio=${fInicio}&fechaFin=${fFin}`
      );

      if (response.ok) {
        setDatos(response.datos);
        if (response.datos.length === 0) {
          setError("No se encontraron socios en ese rango de fechas.");
        }
      } else {
        setError(response.mensaje || "Error al buscar socios.");
        setDatos([]);
      }
    } catch {
      setError("Error de conexión al buscar socios.");
      setDatos([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Listado de Socios por Fecha de Nacimiento
        </Typography>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Fecha Inicio"
                  value={fechaInicio}
                  onChange={(newValue) => setFechaInicio(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                  disableFuture
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Fecha Fin"
                  value={fechaFin}
                  onChange={(newValue) => setFechaFin(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                  disableFuture
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleBuscar}
                disabled={isLoading}
                sx={{ height: 56 }}
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {error && (
        <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: "#ffebee" }}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Paper>
      )}

      {datos.length > 0 && (
        <TableContainer
          component={Paper}
          elevation={4}
          sx={{ borderRadius: 2 }}
        >
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
                    {clubs.find((c) => c.id_club === row.id_club)?.nombre}
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
      )}
    </Container>
  );
}

export default ListadoSociosFecha;
