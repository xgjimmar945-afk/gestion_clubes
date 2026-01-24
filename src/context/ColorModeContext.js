/**
 * @fileoverview Contexto de React para gestionar el modo de color (claro/oscuro) de la aplicación.
 * Permite que cualquier componente de la aplicación acceda y modifique el modo de color actual.
 */

import { createContext } from 'react';

/**
 * Contexto de React para compartir el estado del modo de color entre componentes.
 * 
 * Este contexto permite:
 * - Acceder al modo actual ('light' o 'dark') desde cualquier componente
 * - Alternar entre modo claro y oscuro mediante la función toggleColorMode
 * 
 * Valor por defecto:
 * - mode: 'light' - Modo inicial de la aplicación
 * - toggleColorMode: función vacía (será sobrescrita por el Provider en App.jsx)
 * 
 * @type {React.Context<{toggleColorMode: () => void, mode: string}>}
 * 
 * @example
 * // Uso en un componente
 * import { useContext } from 'react';
 * import { ColorModeContext } from './context/ColorModeContext';
 * 
 * function MyComponent() {
 *   const { mode, toggleColorMode } = useContext(ColorModeContext);
 *   return (
 *     <button onClick={toggleColorMode}>
 *       Modo actual: {mode}
 *     </button>
 *   );
 * }
 */
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    mode: 'light',
});
