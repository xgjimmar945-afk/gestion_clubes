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
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AltaClub() {
  const navigate = useNavigate();
  const [club, setClub] = useState({
    nombre: "",
    id_rama: "",
    descripcion: "",
    direccion: "",
    fecha_fundacion: "",
    presupuesto_anual: 0,
    esta_activo: true,
  });
  const [isCamposValidos, setIsCamposValidos] = useState({
    nombre: true,
    id_rama: true,
    descripcion: true,
    direccion: true,
    fecha_fundacion: true,
  });

  const [rama, setRama] = useState("");
  const [ramas, setRamas] = useState([]);
  const [isError, setIsError] = useState(null);

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

  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  useEffect(() => {
    async function fetchCreateClub() {
      try {
        const respuesta = await api.post("/clubs", club);

        if (respuesta.ok) {
          setDialogMessage(respuesta.mensaje);
          setDialogSeverity("success");
          setOpenDialog(true);
        } else {
          setDialogMessage(respuesta.mensaje || "Error del servidor");
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

    if (isUpdating) fetchCreateClub();
  }, [isUpdating]);

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

    if (club.presupuesto_anual < 0) {
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
            Alta de Club
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
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
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
                    checked={club.esta_activo}
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
