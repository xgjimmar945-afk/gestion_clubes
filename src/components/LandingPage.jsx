import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";
import { Button, Typography, Box, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselItem itemId={1}>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1772&auto=format&fit=crop"
            className="d-block w-100"
            alt="Universo"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <MDBCarouselCaption>
            <Typography
              variant="h3"
              color="white"
              sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
            >
              Descubre el Universo
            </Typography>
            <Typography
              variant="h6"
              color="white"
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
            >
              Únete a nuestros clubes de astronomía y explora las estrellas.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/socios/new")}
            >
              Únete Ahora
            </Button>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1770&auto=format&fit=crop"
            className="d-block w-100"
            alt="Biologia"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <MDBCarouselCaption>
            <Typography
              variant="h3"
              color="white"
              sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
            >
              Biología y Vida
            </Typography>
            <Typography
              variant="h6"
              color="white"
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
            >
              Investiga los misterios de la vida en nuestros laboratorios.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/socios/new")}
            >
              Únete Ahora
            </Button>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1770&auto=format&fit=crop"
            className="d-block w-100"
            alt="Tecnologia"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <MDBCarouselCaption>
            <Typography
              variant="h3"
              color="white"
              sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
            >
              Tecnología e Innovación
            </Typography>
            <Typography
              variant="h6"
              color="white"
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
            >
              Construye el futuro con robótica y programación.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/socios/new")}
            >
              Únete Ahora
            </Button>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom color="primary">
              Bienvenido a Clubes de Ciencia
            </Typography>
            <Typography variant="body1" paragraph>
              Somos una comunidad apasionada por la ciencia y la tecnología.
              Nuestra misión es fomentar la curiosidad y el aprendizaje a través
              de la experimentación y la colaboración.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/clubs")}
            >
              Ver Clubes
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
              alt="Ciencia"
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1770&auto=format&fit=crop"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LandingPage;
