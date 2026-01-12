import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

import Box from "@mui/material/Box";
import api from "../api";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";

export default function EditarSocio() {
  const { id } = useParams();

  const [socio, setSocio] = useState({
    nombre: "",
    apellido: "",
    email: "",
    id_club: "",
    fecha_nacimiento: "",
    altura_metros: "",
    ha_pagado_cuota: false,
  });

  const navigate = useNavigate();

  const [isCamposValidos, setIsCamposValidos] = useState({
    nombre: true,
    apellido: true,
    email: true,
    id_club: true,
  });

  const [club, setClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchClubs() {
      try {
        let respuesta = await api.get("/clubs");

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
  }, []);

  useEffect(() => {
    async function fetchSocio() {
      try {
        let respuesta = await api.get(`/socios/${id}`);

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setSocio(datos);
        } else {
          setIsError("Hubo un error al obtener el socio");
        }
      } catch (error) {
        setIsError("No pudimos hacer la solicitud del socio");
      }
    }

    fetchSocio();
  }, [id]);

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setSocio({
      ...socio,
      [event.target.name]: value,
    });
  };

  const handleClick = (event) => {
    if (validarDatos()) {
      setIsUpdating(true);
    }
  };

  const validarDatos = () => {
    let isValid = true;
    let objetoValidacion = {
      nombre: true,
      apellido: true,
      email: true,
    };

    // Funcion para comprobar que no hayan numeros en el texto
    function tiene_numeros(texto) {
      return /\d/.test(texto);
    }

    // Funcion para validar formato de email
    function validar_email(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Validacion del nombre (mínimo 2 caracteres, máximo 50, sin números)
    if (
      socio.nombre.trim().length < 2 ||
      socio.nombre.trim().length > 50 ||
      tiene_numeros(socio.nombre)
    ) {
      isValid = false;
      objetoValidacion.nombre = false;
    }

    // Validacion del apellido (mínimo 2 caracteres, máximo 50, sin números)
    if (
      socio.apellido.trim().length < 2 ||
      socio.apellido.trim().length > 50 ||
      tiene_numeros(socio.apellido)
    ) {
      isValid = false;
      objetoValidacion.apellido = false;
    }

    // Validacion del email (formato válido y longitud máxima)
    if (!validar_email(socio.email) || socio.email.length > 100) {
      isValid = false;
      objetoValidacion.email = false;
    }

    if (!socio.fecha_nacimiento) {
      isValid = false;
    }

    if (
      socio.altura_metros &&
      (socio.altura_metros < 0 || socio.altura_metros > 3)
    ) {
      isValid = false;
    }

    setIsCamposValidos(objetoValidacion);
    return isValid;
  };

  useEffect(() => {
    if (socio == null) {
      return (
        <Typography variant="h6" color="error">
          Error al cargar
        </Typography>
      );
    }
  }, [socio]);

  useEffect(() => {
    async function fetchEditarSocio() {
      try {
        let respuesta = await api.put(`socios/${id}`, socio);

        if (respuesta.ok) {
          navigate("/socios");
        } else {
          setIsError(respuesta.mensaje || "Error del servidor");
        }
      } catch (e) {
        console.error("Error (catch):", e);
        setIsError(`Error de conexión: ${e.message || "desconocido"}`);
      }
    }

    if (isUpdating) fetchEditarSocio();
  }, [isUpdating, id]);

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color="primary"
            sx={{ mb: 3 }}
          >
            Editar Socio
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                autoFocus
                id="nombre"
                label="Nombre"
                name="nombre"
                type="text"
                maxLength="50"
                value={socio.nombre}
                onChange={handleChange}
                error={!isCamposValidos.nombre}
                helperText={
                  !isCamposValidos.nombre &&
                  "El nombre debe tener entre 2 y 50 caracteres y no puede contener números."
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                type="text"
                maxLength="50"
                value={socio.apellido}
                onChange={handleChange}
                error={!isCamposValidos.apellido}
                helperText={
                  !isCamposValidos.apellido &&
                  "El apellido debe tener entre 2 y 50 caracteres y no puede contener números."
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="club">Club</InputLabel>
                  <Select
                    labelId="club"
                    id="club"
                    name="id_club"
                    value={socio.id_club}
                    label="Club"
                    onChange={handleChange}
                  >
                    {clubs.map((club) => (
                      <MenuItem key={club.id_club} value={club.id_club}>
                        {club.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="text"
                maxLength="500"
                value={socio.email}
                onChange={handleChange}
                error={!isCamposValidos.email}
                helperText={
                  !isCamposValidos.email &&
                  "Ingrese un email válido (máximo 100 caracteres)."
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  label="Fecha de Nacimiento"
                  name="fecha_nacimiento"
                  value={
                    socio.fecha_nacimiento
                      ? dayjs(socio.fecha_nacimiento)
                      : null
                  }
                  disableFuture
                  onChange={(newValue) => {
                    setSocio({
                      ...socio,
                      fecha_nacimiento: newValue
                        ? newValue.format("YYYY-MM-DD")
                        : "",
                    });
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="altura_metros"
                label="Altura (metros)"
                name="altura_metros"
                type="number"
                value={socio.altura_metros}
                onChange={handleChange}
                inputProps={{ min: "0", max: "3", step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!socio.ha_pagado_cuota}
                    onChange={handleChange}
                    name="ha_pagado_cuota"
                    color="primary"
                  />
                }
                label="Ha Pagado Cuota"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleClick}
              startIcon={<SaveIcon />}
            >
              Aceptar
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
