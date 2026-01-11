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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";

export default function BusquedaClub() {
  const [rama, setRama] = useState("");
  const [ramas, setRamas] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
        setIsError("No pudimos hacer la solicitud de las temáticas");
      }
    }

    fetchRamas();
  }, []);

  const handleChangeRama = (event) => {
    setRama(event.target.value);
    setIsUpdating(false);
  };

  const [club, setClub] = useState("");
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const respuesta = await api.get(`/clubs/ramas/${rama}`);

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setClubs(datos);
          if (datos.length > 0) {
            setClub(datos[0].id_club);
          }
        } else {
          setIsError("Hubo un error al obtener los clubs");
        }
      } catch (error) {
        setIsError("No pudimos hacer la solicitud de los clubs");
      }
    }

    fetchClubs();
  }, [rama]);

  const handleClick = () => {
    setIsUpdating(true);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Búsqueda de Clubes por Rama
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="rama">Rama</InputLabel>
                <Select
                  labelId="rama"
                  id="rama"
                  name="id_rama"
                  value={rama}
                  label="Rama"
                  onChange={handleChangeRama}
                >
                  {ramas.map((rama) => (
                    <MenuItem key={rama.id_rama} value={rama.id_rama}>
                      {rama.nombre_rama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleClick}
              sx={{ height: "56px" }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {isUpdating && (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}
        >
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
              </TableRow>
            </TableHead>
            <TableBody>
              {clubs.map((club) => (
                <TableRow
                  key={club.id_club}
                  sx={{ "&:hover": { bgcolor: "action.hover" } }}
                >
                  <TableCell component="th" scope="row" fontWeight="medium">
                    {club.nombre}
                  </TableCell>
                  <TableCell>{club.descripcion}</TableCell>
                  <TableCell>{club.direccion}</TableCell>
                  <TableCell>{club.fecha_fundacion}</TableCell>
                  <TableCell>
                    {ramas.find((rama) => rama.id_rama === club.id_rama)
                      ?.nombre_rama || "N/A"}
                  </TableCell>
                  <TableCell>${club.presupuesto_anual}</TableCell>
                  <TableCell>{club.esta_activo ? "Sí" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
