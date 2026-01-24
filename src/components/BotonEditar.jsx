/**
 * @fileoverview Componente de botón reutilizable para navegar a la página de edición.
 * Utiliza React Router para la navegación programada.
 */

import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

/**
 * Botón de edición genérico para clubes y socios.
 * Navega a la ruta de edición correspondiente al hacer clic.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.ruta - Ruta base de edición (ej: "/clubs/editar/" o "/socios/editar/")
 * @param {string|number} props.id - ID del registro a editar
 * @returns {JSX.Element} Botón de edición con icono
 *
 * @example
 * <BotonEditar ruta="/clubs/editar/" id={123} />
 */
export default function BotonEditar({ ruta, id }) {
  // Hook de navegación de React Router
  const navigate = useNavigate();

  /**
   * Manejador de clic que navega a la página de edición.
   * Concatena la ruta base con el ID del registro.
   * @async
   */
  async function handleEditar() {
    navigate(ruta + id);
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEditar()}
      >
        <EditIcon />
      </Button>
    </>
  );
}
