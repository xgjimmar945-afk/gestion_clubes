import { createContext } from 'react';

// Esta clase de JS permite compartir el estado del modo oscuro entre componentes
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    mode: 'light',
});
