import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import api from "../api";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function BusquedaSocio() {
  const [club, setClub] = useState("");

  const [socios, setSocios] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const respuesta = await api.get("/clubs");

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setClubs(datos);
        } else {
          // setIsError("Hubo un error al obtener las temáticas");
        }
      } catch {
        // setIsError("No pudimos hacer la solicitud de las temáticas");
      }
    }

    fetchClubs();
  }, []);

  const handleChangeClub = (event) => {
    setClub(event.target.value);
    setIsUpdating(false);
  };

  useEffect(() => {
    async function fetchSocios() {
      try {
        const respuesta = await api.get(`/socios/club/${club}`);

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setSocios(datos);
        } else {
          // setIsError("Hubo un error al obtener los clubs");
        }
      } catch {
        // setIsError("No pudimos hacer la solicitud de los clubs");
      }
    }

    fetchSocios();
  }, [club]);

  const handleClick = () => {
    setIsUpdating(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Búsqueda de Socios por Club
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel id="club">Club</InputLabel>
              <Select
                labelId="club"
                id="club"
                name="id_club"
                value={club}
                label="Club"
                onChange={handleChangeClub}
              >
                {clubs.map((club) => (
                  <MenuItem key={club.id_club} value={club.id_club}>
                    {club.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleClick}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {isUpdating && (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {socios.map((socio) => (
                <TableRow
                  key={socio.id_socio}
                  sx={{ "&:hover": { bgcolor: "action.hover" } }}
                >
                  <TableCell>{socio.nombre}</TableCell>
                  <TableCell>{socio.apellido}</TableCell>
                  <TableCell>{socio.email}</TableCell>
                  <TableCell>{socio.fecha_nacimiento}</TableCell>
                  <TableCell>{socio.altura_metros}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: socio.ha_pagado_cuota
                          ? "success.main"
                          : "text.secondary",
                      }}
                    >
                      {socio.ha_pagado_cuota ? "Sí" : "No"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {
                      clubs.find((club) => club.id_club === socio.id_club)
                        ?.nombre
                    }
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
