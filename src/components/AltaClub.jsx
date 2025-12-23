import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Box from "@mui/material/Box";

export default function AltaClub() {
  const [club, setClub] = useState({
    nombre: "",
    tematica: "",
    descripcion: "",
    direccion: "",
    fecha_fundacion: "",
  });
  const [isCamposValidos, setIsCamposValidos] = useState({
    nombre: true,
    tematica: true,
    descripcion: true,
    direccion: true,
    fecha_fundacion: true,
  });


  const handleChange = (event) => {
    const { nombre, value } = event.target;
    setClub({
      ...club,
      [nombre]: value,
    });
  };

  const handleClick = (event) => {
    if (validarDatos()) {
      alert("Datos Válidos");
    }
  };

  const validarDatos = () => {
    let isValid = true;
    let objetoValidacion = {
      nombre: true,
      tematica: true,
      descripcion: true,
      direccion: true,
      fecha_fundacion: true,
    };

    // Validacion del nombre
    if (club.nombre.length > 10) {
      isValid = false;
      objetoValidacion.nombre = false;
    }

    // Validacion de la fecha de nacimiento
    if (
      club.fecha_fundacion > "1800-01-01" &&
      Date.now().toISOString().substr(0, 10)
    ) {
      isValid = false;
      objetoValidacion.fecha_fundacion = false;
    }

    // Validacion de la biografia
    if (club.descripcion.length > 500) {
      isValid = false;
      objetoValidacion.descripcion = false;
    }

    // Validacion de la url
    if (club.direccion.length > 255) {
      isValid = false;
      objetoValidacion.direccion = false;
    }

    setIsCamposValidos(objetoValidacion);
    return isValid;
  };
  return (
    <>
      <Typography variant="h3">Alta de Club</Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 7 }}>
          <TextField
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            type="text"
            slotProps={{ maxLength: 100 }}
            value={club.nombre}
            onChange={handleChange}
            error={!isCamposValidos.nombre}
            helperText={
              !isCamposValidos.nombre && "Compruebe el formato del nombre."
            }
          />
        </Grid>
        <Grid>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="tematica">Temática</InputLabel>
              <Select
                labelId="tematica"
                id="tematica"
                value={club.tematica}
                label="Temática"
                onChange={handleChange}
              >
                <MenuItem value={1}>Astronomía</MenuItem>
                <MenuItem value={2}>Tecnología</MenuItem>
                <MenuItem value={3}>Biología</MenuItem>
                <MenuItem value={4}>Física</MenuItem>
                <MenuItem value={5}>Química</MenuItem>
                <MenuItem value={6}>Matemática</MenuItem>
                <MenuItem value={7}>Informática</MenuItem>
                <MenuItem value={8}>Geología</MenuItem>
                <MenuItem value={9}>Zoológica</MenuItem>
                <MenuItem value={10}>Botánica</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item size={{ xs: 7 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              label="Fecha de Nacimiento"
              name="fecha_fundacion"
              value={club.fecha_fundacion ? dayjs(club.fecha_fundacion) : null}
              disableFuture
              onChange={(newValue) => {
                setClub({
                  ...club,
                  fecha_fundacion: newValue.format("YYYY-MM-DD"),
                });
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item size={{ xs: 7 }}>
          <TextField
            required
            fullWidth
            id="descripcion"
            label="Descripción"
            name="descripcion"
            type="text"
            multiline
            rows={4}
            slotProps={{ maxLength: 500 }}
            value={club.descripcion}
            onChange={handleChange}
            error={!isCamposValidos.descripcion}
            helperText={
              !isCamposValidos.descripcion &&
              "Compruebe que no se pasa de los 255 caracteres."
            }
          />
        </Grid>
        <Grid item size={{ xs: 7 }}>
          <TextField
            required
            fullWidth
            id="direccion"
            label="Direccion"
            name="direccion"
            type="text"
            slotProps={{ maxLength: 255 }}
            value={club.direccion}
            onChange={handleChange}
            error={!isCamposValidos.direccion}
            helperText={
              !isCamposValidos.direccion &&
              "Compruebe el formato de la direccion."
            }
          />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
        Aceptar
      </Button>
    </>
  );
}
