import { useEffect, useState } from "react";
import {
  Bar,
  Cell,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Text,
  ResponsiveContainer,
} from "recharts";

import DownloadIcon from "@mui/icons-material/Download";
import { Box, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import { RechartsDevtools } from "@recharts/devtools";
import api from "../api";


function GraficaClubs() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28BFE",
    "#FF4567",
    "#32CD32",
    "#8B008B",
    "#FF1493",
    "#00FFFF",
    "#7FFF00",
    "#D2691E",
    "#DC143C",
    "#FFD700",
    "#ADFF2F",
    "#8A2BE2",
    "#FF6347",
    "#40E0D0",
    "#DA70D6",
    "#FF4500",
    "#1E90FF",
    "#3CB371",
    "#9932CC",
    "#FF8C00",
    "#66CDAA",
    "#B22222",
    "#FF00FF",
    "#FFDEAD",
    "#4B0082",
    "#20B2AA",
    "#E6E6FA",
    "#8B4513",
    "#48D1CC",
    "#FF69B4",
    "#CD5C5C",
    "#4682B4",
    "#EE82EE",
    "#FF7F50",
    "#9ACD32",
    "#BA55D3",
    "#6495ED",
    "#2E8B57",
    "#FFB6C1",
    "#DB7093",
    "#5F9EA0",
    "#FFDAB9",
    "#FF0000",
    "#8FBC8F",
    "#7B68EE",
    "#FA8072",
  ];

  useEffect(() => {
    async function fetchClubs() {
      try {
        const respuesta = await api.get("/clubs/graph");

        // Actualizamos los datos de directores
        setDatos(respuesta.datos);

        // Y no tenemos errores
        setError(null);
      } catch (error) {
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchClubs();
  }, []);

  if (error != null) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  if (!datos || datos.length === 0) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay datos disponibles
        </Typography>
      </>
    );
  }

  return (
    <>
      <Box id="pdf-content">
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          Número de socios por club
        </Typography>

        <Box sx={{ width: "100%", height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={datos}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 70,
              }}
            >
              <Text
                value="Número de socios por club"
                offset={70}
                position="outside"
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="id_club_CLUB.nombre"
                angle={-30}
                textAnchor="end"
                interval={0}
                tick={{
                  fontSize: 15,
                  fontWeight: "bold",
                  fontFamily: "Arial",
                  fontStyle: "italic",
                }}
                label={{
                  value: "Clubes",
                  position: "insideBottom",
                  offset: -50,
                }}
              />
              <YAxis
                width={40}
                label={{ value: "Socios", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total"
                radius={[10, 10, 0, 0]}
                activeBar={{ fill: "gold", stroke: "purple" }}
              >
                {datos.map((entry, index) => (
                  <>
                    <Cell
                      key={index.total}
                      fill={COLORS[index % COLORS.length]}
                    />
                  </>
                ))}
              </Bar>
              <RechartsDevtools />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      
    </>
  );
}

export default GraficaClubs;
