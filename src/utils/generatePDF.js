/**
 * @fileoverview Utilidad para generar archivos PDF a partir de contenido HTML.
 * Utiliza html2canvas para capturar el contenido y jsPDF para generar el documento.
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Genera un archivo PDF a partir del contenido de un elemento HTML especificado.
 * 
 * Proceso:
 * 1. Captura el elemento HTML como imagen usando html2canvas
 * 2. Convierte la imagen a formato PNG
 * 3. Crea un documento PDF en formato A4
 * 4. Agrega la imagen al PDF con dimensiones ajustadas
 * 5. Descarga el PDF con el nombre especificado
 * 
 * @param {string} zonaImpresion - ID del elemento HTML a capturar (sin el #)
 * @param {string} nombreDocumento - Nombre del archivo PDF a generar (sin extensión)
 * 
 * @example
 * // Generar PDF del elemento con id="listado-clubs"
 * generatePDF("listado-clubs", "clubs_2024");
 * // Resultado: descarga el archivo "clubs_2024.pdf"
 */
const generatePDF = (zonaImpresion, nombreDocumento) => {
  // Obtener el elemento HTML a capturar
  const input = document.getElementById(zonaImpresion);

  // Capturar el elemento como imagen
  html2canvas(input, {
    scale: 2, // Escala para mejor calidad (2x resolución)
    ignoreElements: (el) => el.classList.contains("omitir-pdf"), // Elementos a ignorar en la captura
  }).then((canvas) => {
    // Convertir el canvas a una imagen en formato PNG
    const imgData = canvas.toDataURL("image/png");

    // Crear un nuevo documento PDF en formato A4 vertical
    const pdf = new jsPDF("p", "mm", "a4");

    // Dimensiones de la página A4
    const imgWidth = 210; // Ancho de A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajuste de altura proporcional

    // Agregar la imagen al PDF
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Guardar y descargar el PDF con el nombre especificado
    pdf.save(nombreDocumento + ".pdf");
  });
};

export default generatePDF;
