/**
 * @fileoverview Componente para editar un club existente en el sistema.
 * Carga los datos del club desde el backend y permite modificarlos.
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useParams } from "react-router-dom";

/**
 * Componente de formulario para editar un club existente.
 *
 * Funcionalidades:
 * - Carga los datos del club desde el backend usando el ID de la URL
 * - Formulario pre-rellenado con los datos actuales
 * - Validaciones en tiempo real
 * - Actualización de datos mediante API PUT
 * - Navegación automática tras actualización exitosa
 *
 * @component
 * @returns {JSX.Element} Formulario de edición de club
 */
export default function EditarClub() {
  // Obtener el ID del club desde los parámetros de la URL
  const { id } = useParams();

  /**
   * Estado del club que se está editando.
   * Se inicializa vacío y se rellena al cargar los datos del backend.
   * @type {Object}
   */
  const [club, setClub] = useState({
    nombre: "",
    id_rama: "",
    descripcion: "",
    direccion: "",
    fecha_fundacion: "",
    presupuesto_anual: 0,
    esta_activo: true,
  });

  // Hook de navegación para redireccionar tras actualización exitosa
  const navigate = useNavigate();

  /**
   * Estado de validación de cada campo del formulario.
   * @type {Object}
   */
  const [isCamposValidos, setIsCamposValidos] = useState({
    nombre: true,
    id_rama: true,
    descripcion: true,
    direccion: true,
    fecha_fundacion: true,
  });

  // Estado para la rama seleccionada
  const [rama, setRama] = useState("");
  // Lista de ramas disponibles
  const [ramas, setRamas] = useState([]);
  // Estado para manejar errores
  const [isError, setIsError] = useState(null);
  // Estado para controlar si se está enviando la actualización
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Effect para cargar las ramas disponibles al montar el componente.
   */
  useEffect(() => {
    async function fetchRamas() {
      try {
        const respuesta = await api.get("/ramas");

        if (respuesta.ok) {
          const datos = respuesta.datos;

          setRamas(datos);
          // Seleccionar la primera rama por defecto si existe
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

  /**
   * Effect para cargar los datos del club cuando cambia el ID.
   * Se ejecuta al montar el componente y cuando el ID de la URL cambia.
   */
  useEffect(() => {
    async function fetchClub() {
      try {
        let respuesta = await api.get(`/clubs/${id}`);

        if (respuesta.ok) {
          const datos = respuesta.datos;

          // Actualizar el estado con los datos del club
          setClub(datos);
        } else {
          setIsError("Hubo un error al obtener el club");
        }
      } catch (error) {
        setIsError("No pudimos hacer la solicitud del club");
      }
    }

    fetchClub();
  }, [id]); // Re-ejecutar si cambia el ID

  /**
   * Manejador de cambios en los campos del formulario.
   * @param {Event} event - Evento de cambio del input
   */
  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setClub({
      ...club,
      [event.target.name]: value,
    });
  };

  /**
   * Manejador del clic en el botón de guardar.
   * Valida los datos antes de iniciar la actualización.
   * @param {Event} event - Evento de clic
   */
  const handleClick = (event) => {
    if (validarDatos()) {
      setIsUpdating(true);
    }
  };

  /**
   * Valida todos los campos del formulario antes de actualizar.
   * Aplica las mismas reglas que en el alta de club.
   * @returns {boolean} true si todos los campos son válidos
   */
  const validarDatos = () => {
    let isValid = true;
    let objetoValidacion = {
      nombre: true,
      descripcion: true,
      direccion: true,
      fecha_fundacion: true,
    };

    // Validacion del nombre (mínimo 3 caracteres, máximo 100)
    if (club.nombre.trim().length < 3 || club.nombre.trim().length > 100) {
      isValid = false;
      objetoValidacion.nombre = false;
    }

    // Validacion de la fecha de fundacion
    if (!club.fecha_fundacion) {
      isValid = false;
      objetoValidacion.fecha_fundacion = false;
    } else {
      // Verificar que la fecha no sea futura
      const fechaSeleccionada = new Date(club.fecha_fundacion);
      const hoy = new Date();
      if (fechaSeleccionada > hoy) {
        isValid = false;
        objetoValidacion.fecha_fundacion = false;
      }
    }

    // Validacion de la descripcion (mínimo 10 caracteres, máximo 500)
    if (
      club.descripcion.trim().length < 10 ||
      club.descripcion.trim().length > 500
    ) {
      isValid = false;
      objetoValidacion.descripcion = false;
    }

    // Validacion de la direccion (mínimo 10 caracteres, máximo 255)
    if (
      club.direccion.trim().length < 10 ||
      club.direccion.trim().length > 255
    ) {
      isValid = false;
      objetoValidacion.direccion = false;
    }

    // Validación del presupuesto (no negativo)
    if (club.presupuesto_anual < 0) {
      isValid = false;
    }

    setIsCamposValidos(objetoValidacion);
    return isValid;
  };

  /**
   * Effect para verificar que el club se haya cargado correctamente.
   * Muestra un mensaje de error si el club es null.
   */
  useEffect(() => {
    if (club == null) {
      return (
        <Typography variant="h6" color="error">
          Error al cargar
        </Typography>
      );
    }
  }, [club]);

  /**
   * Effect para actualizar el club cuando isUpdating cambia a true.
   * Envía una petición PUT al backend con los datos modificados.
   */
  useEffect(() => {
    async function fetchEditarClub() {
      try {
        let respuesta = await api.put(`clubs/${id}`, club);

        if (respuesta.ok) {
          // Redirigir al listado de clubes tras actualización exitosa
          navigate("/clubs");
        } else {
          setIsError("Hubo un error al obtener el club");
        }
      } catch (error) {
        console.error("Error (catch):", error);
        setIsError(`Error de conexión: ${error.message || "desconocido"}`);
      }
    }

    if (isUpdating) fetchEditarClub();
  }, [isUpdating, id]); // Re-ejecutar si cambia isUpdating o id

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="primary"
          sx={{ mb: 3 }}
        >
          Editar Club
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
              maxLength="100"
              value={club.nombre}
              onChange={handleChange}
              error={!isCamposValidos.nombre}
              helperText={
                !isCamposValidos.nombre &&
                "El nombre debe tener entre 3 y 100 caracteres."
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="rama">Rama</InputLabel>
                <Select
                  labelId="rama"
                  id="rama"
                  name="id_rama"
                  value={club.id_rama}
                  label="Rama"
                  onChange={handleChange}
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
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Fecha de Fundación"
                name="fecha_fundacion"
                value={
                  club.fecha_fundacion ? dayjs(club.fecha_fundacion) : null
                }
                disableFuture
                slotProps={{ textField: { fullWidth: true } }}
                onChange={(newValue) => {
                  setClub({
                    ...club,
                    fecha_fundacion: newValue
                      ? newValue.format("YYYY-MM-DD")
                      : "",
                  });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="presupuesto_anual"
              label="Presupuesto Anual"
              name="presupuesto_anual"
              type="number"
              value={club.presupuesto_anual}
              onChange={handleChange}
              inputProps={{ min: "0", step: "0.01" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="descripcion"
              label="Descripción"
              name="descripcion"
              type="text"
              multiline
              rows={4}
              maxLength="2000"
              value={club.descripcion}
              onChange={handleChange}
              error={!isCamposValidos.descripcion}
              helperText={
                !isCamposValidos.descripcion &&
                "La descripción debe tener entre 10 y 500 caracteres."
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="direccion"
              label="Direccion"
              name="direccion"
              type="text"
              maxLength="255"
              value={club.direccion}
              onChange={handleChange}
              error={!isCamposValidos.direccion}
              helperText={
                !isCamposValidos.direccion &&
                "La dirección debe tener entre 10 y 255 caracteres."
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!club.esta_activo}
                  onChange={handleChange}
                  name="esta_activo"
                  color="primary"
                />
              }
              label="Está Activo"
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
  );
}
