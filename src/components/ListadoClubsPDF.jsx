import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 8,
    fontWeight: "bold",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 8,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 8,
  },
  // Column specific widths
  colNombre: { width: "15%" },
  colDescripcion: { width: "25%" },
  colDireccion: { width: "20%" },
  colFecha: { width: "10%" },
  colRama: { width: "15%" },
  colPresupuesto: { width: "10%" },
  colActivo: { width: "5%" },
});

function ListadoClubsPDF({ data, ramas }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>Listado de Clubs</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, styles.colNombre]}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colDescripcion]}>
              <Text style={styles.tableCell}>Descripción</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colDireccion]}>
              <Text style={styles.tableCell}>Dirección</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colFecha]}>
              <Text style={styles.tableCell}>Fecha Fun.</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colRama]}>
              <Text style={styles.tableCell}>Rama Científica</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colPresupuesto]}>
              <Text style={styles.tableCell}>Presup.</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colActivo]}>
              <Text style={styles.tableCell}>Act.</Text>
            </View>
          </View>

          {data.map((club, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={[styles.tableCol, styles.colNombre]}>
                <Text style={styles.tableCell}>{club.nombre}</Text>
              </View>
              <View style={[styles.tableCol, styles.colDescripcion]}>
                <Text style={styles.tableCell}>{club.descripcion}</Text>
              </View>
              <View style={[styles.tableCol, styles.colDireccion]}>
                <Text style={styles.tableCell}>{club.direccion || ""}</Text>
              </View>
              <View style={[styles.tableCol, styles.colFecha]}>
                <Text style={styles.tableCell}>{club.fecha_fundacion}</Text>
              </View>
              <View style={[styles.tableCol, styles.colRama]}>
                <Text style={styles.tableCell}>
                  {ramas?.find((r) => r.id_rama === club.id_rama)
                    ?.nombre_rama || "N/A"}
                </Text>
              </View>
              <View style={[styles.tableCol, styles.colPresupuesto]}>
                <Text style={styles.tableCell}>{club.presupuesto_anual}</Text>
              </View>
              <View style={[styles.tableCol, styles.colActivo]}>
                <Text style={styles.tableCell}>
                  {club.esta_activo ? "Sí" : "No"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ListadoClubsPDF;
