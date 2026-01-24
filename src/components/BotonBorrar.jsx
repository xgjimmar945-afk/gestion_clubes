/**
 * @fileoverview Componente de botón reutilizable para eliminar registros.
 * Realiza una petición DELETE al backend y recarga la página.
 */

import api from "../api";
import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Botón de eliminación genérico para clubes y socios.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.ruta - Ruta base de la API (ej: "/clubs/" o "/socios/")
 * @param {string|number} props.id - ID del registro a eliminar
 * @returns {JSX.Element} Botón de eliminación con icono
 *
 * @example
 * <BotonBorrar ruta="/clubs/" id={123} />
 */
export default function BotonBorrar({ ruta, id }) {
  // Estado para manejar errores de eliminación
  const [error, setError] = useState(null);
  // Estado para los datos (no utilizado actualmente)
  const [datos, setDatos] = useState([]);

  /**
   * Manejador de eliminación de registro.
   * Envía una petición DELETE al backend y recarga la página tras éxito.
   *
   * @param {string|number} id - ID del registro a eliminar
   * @async
   */
  async function handleDelete(id) {
    try {
      // Enviar petición DELETE al backend
      await api.delete(ruta + id);

      // Filtrar el registro eliminado de los datos locales
      const datos_nuevos = datos.filter((dato) => dato.id != id);

      setDatos(datos_nuevos);

      setError(null);
      // Recargar la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
      setDatos([]);
    }
  }
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(id)}
      >
        <DeleteIcon />
      </Button>
    </>
  );
}
