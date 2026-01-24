/**
 * @fileoverview Componente para dar de alta un nuevo socio en el sistema.
 * Proporciona un formulario completo con validaciones para crear socios asociados a clubes.
 */

import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

import Box from "@mui/material/Box";
import api from "../api";

import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";

/**
 * Componente de formulario para dar de alta un nuevo socio.
 *
 * Funcionalidades:
 * - Formulario con validaciones personalizadas (email, nombres sin números, altura)
 * - Selección de club desde el catálogo
 * - Selector de fecha de nacimiento con restricción de fechas futuras
 * - Validación de formato de email
 * - Diálogo de confirmación con resultado de la operación
 * - Navegación automática tras éxito
 *
 * @component
 * @returns {JSX.Element} Formulario de alta de socio
 */
export default function AltaSocio() {
  // Hook de navegación para redireccionar tras operaciones exitosas
  const navigate = useNavigate();

  /**
   * Estado del socio que se está creando.
   * Contiene todos los campos del formulario.
   * @type {Object}
   */
  const [socio, setSocio] = useState({
    nombre: "",
    apellido: "",
    email: "",
    id_club: "",
    fecha_nacimiento: "",
    altura_metros: "",
    ha_pagado_cuota: false,
  });

  /**
   * Estado de validación de cada campo del formulario.
   * @type {Object}
   */
  const [isCamposValidos, setIsCamposValidos] = useState({
    nombre: true,
    apellido: true,
    email: true,
    id_club: true,
  });

  // Estado para el club seleccionado
  const [club, setClub] = useState("");
  // Lista de clubes disponibles
  const [clubs, setClubs] = useState([]);
  // Estado para manejar errores de carga
  const [isError, setIsError] = useState(null);

  /**
   * Effect para cargar los clubes disponibles al montar el componente.
   */
  useEffect(() => {
    async function fetchClubs() {
      try {
        let respuesta = await api.get("/clubs");

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setClubs(datos);
          // Seleccionar automáticamente el primer club
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

  // Estado para controlar si se está enviando la petición
  const [isUpdating, setIsUpdating] = useState(false);
  // Estado para controlar la visibilidad del diálogo
  const [openDialog, setOpenDialog] = useState(false);
  // Mensaje a mostrar en el diálogo
  const [dialogMessage, setDialogMessage] = useState("");
  // Severidad del diálogo (success/error)
  const [dialogSeverity, setDialogSeverity] = useState("success");

  useEffect(() => {
    async function fetchCreateSocio() {
      try {
        let respuesta = await api.post("/socios", socio);

        if (respuesta.ok) {
          setDialogMessage(respuesta.mensaje);
          setDialogSeverity("success");
          setOpenDialog(true);
        } else {
          setDialogMessage(respuesta.mensaje || "Error del servidor");
          setDialogSeverity("error");
          setOpenDialog(true);
        }
      } catch (e) {
        console.error("Error (catch):", e);
        setDialogMessage(`Error de conexión: ${e.message || "desconocido"}`);
        setDialogSeverity("error");
        setOpenDialog(true);
      }
      setIsUpdating(false);
    }

    if (isUpdating) fetchCreateSocio();
  }, [isUpdating]);

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
    if (isUpdating) return;

    if (validarDatos()) {
      setIsUpdating(true);
    }
  };

  function handleDialogClose() {
    setOpenDialog(false);

    if (dialogSeverity === "success") navigate("/");
  }

  /**
   * Valida todos los campos del formulario antes de enviar.
   *
   * Reglas de validación:
   * - Nombre y apellido: entre 2 y 50 caracteres, sin números
   * - Email: formato válido y máximo 100 caracteres
   * - Fecha de nacimiento: obligatoria
   * - Altura: entre 0 y 3 metros (opcional)
   *
   * @returns {boolean} true si todos los campos son válidos
   */
  const validarDatos = () => {
    let isValid = true;
    let objetoValidacion = {
      nombre: true,
      apellido: true,
      email: true,
    };

    /**
     * Función auxiliar para comprobar que no hayan números en el texto.
     * @param {string} texto - Texto a validar
     * @returns {boolean} true si contiene números
     */
    function tiene_numeros(texto) {
      return /\d/.test(texto);
    }

    /**
     * Función auxiliar para validar formato de email.
     * @param {string} email - Email a validar
     * @returns {boolean} true si el formato es válido
     */
    function validar_email(email) {
      const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return res.test(email);
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

    // Validación de fecha de nacimiento (obligatoria)
    if (!socio.fecha_nacimiento) {
      isValid = false;
    }

    // Validación de altura (opcional, pero si se proporciona debe estar entre 0 y 3)
    if (
      socio.altura_metros &&
      (socio.altura_metros < 0 || socio.altura_metros > 3)
    ) {
      isValid = false;
    }

    setIsCamposValidos(objetoValidacion);
    return isValid;
  };

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            align="center"
            sx={{ mb: 3 }}
          >
            Alta de Socio
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
                    checked={socio.ha_pagado_cuota}
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

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        disableEscapeKeyDown
        aria-labelledby="result-dialog-title"
      >
        <DialogTitle id="result-dialog-title">
          {dialogSeverity === "success" ? "Operación correcta" : "Error"}
        </DialogTitle>
        <DialogContent dividers>
          <Alert severity={dialogSeverity} variant="filled">
            {dialogMessage}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
