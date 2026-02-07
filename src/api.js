/**
 * @fileoverview Configuración centralizada de Axios para comunicación con el backend.
 * Proporciona una instancia configurada de Axios con interceptores para manejo de errores.
 */

import axios from 'axios';

/**
 * Instancia configurada de Axios para comunicación con el backend.
 * 
 * Configuración:
 * - Base URL: http://localhost:3000/api
 * - Timeout: 5000ms (5 segundos)
 * - Content-Type: application/json
 * 
 * @type {import('axios').AxiosInstance}
 */
const baseURL = window.__APP_CONFIG__
    ? window.__APP_CONFIG__.API_URL
    : "http://localhost:3000/api";

const api = axios.create({
    baseURL: baseURL,
});

/**
 * Interceptor de respuesta para manejo centralizado de errores.
 * 
 * Funcionalidad:
 * - En caso de éxito: Retorna directamente los datos de la respuesta (response.data)
 * - En caso de error: Procesa el error y retorna un objeto estandarizado con formato:
 *   { ok: false, datos: null, mensaje: string }
 * 
 * Tipos de errores manejados:
 * - 404: Recurso no encontrado
 * - 400: Solicitud inválida
 * - 5xx: Errores del servidor
 * - Sin respuesta: Problemas de conexión
 * - Errores de configuración: Problemas al preparar la solicitud
 */
api.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa (status 2xx), retornamos solo los datos
        return response.data;
    },
    (error) => {
        // Objeto de respuesta estandarizado para errores
        let respuestaError = {
            ok: false,
            datos: null,
            mensaje: 'Error desconocido',
        };

        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            respuestaError.mensaje = error.response.data?.mensaje ||
                `Error: ${error.response.status} ${error.response.statusText}`;

            // Logging específico según el tipo de error HTTP
            if (error.response.status === 404) {
                console.warn(`Recurso no encontrado: ${error.config.url}`);
            } else if (error.response.status === 400) {
                console.warn(`Solicitud inválida: ${error.config.url}`);
            } else if (error.response.status >= 500) {
                console.error(`Error del servidor: ${error.config.url} - Status: ${error.response.status}`);
            }
        } else if (error.request) {
            // La solicitud fue realizada pero no hubo respuesta del servidor
            // Posibles causas: servidor caído, problemas de red, timeout
            respuestaError.mensaje = 'No hay respuesta del servidor. Verifica tu conexión.';
            console.error('No hay respuesta del servidor:', error.request);
        } else {
            // Algo sucedió al preparar la solicitud que provocó un error
            // Posibles causas: configuración incorrecta, error en el código
            respuestaError.mensaje = error.message || 'Error al realizar la solicitud';
            console.error('Error en la solicitud:', error.message);
        }

        // Rechazamos la promesa con el objeto de error estandarizado
        return Promise.reject(respuestaError);
    }
);

export default api;
