import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ScienceTwoToneIcon from "@mui/icons-material/ScienceTwoTone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import { ColorModeContext } from "../context/ColorModeContext";

function Navbar() {
  const [anclaMenuClubes, setAnclaMenuClubes] = React.useState(null);
  const [anclaMenuSocios, setAnclaMenuSocios] = React.useState(null);
  const [anclaMenuXS, setAnclaMenuXS] = React.useState(null);
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  const handleClickMenuClubes = (event) => {
    setAnclaMenuClubes(event.currentTarget);
  };

  const handleClickMenuSocios = (event) => {
    setAnclaMenuSocios(event.currentTarget);
  };

  const handleClickMenuXS = (event) => {
    setAnclaMenuXS(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnclaMenuClubes(null);
    setAnclaMenuSocios(null);
    setAnclaMenuXS(null);
  };

  const linkStyle = { color: "primary", textDecoration: "none" };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Menú para resolución xs */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu clubes resolucion xs"
              aria-controls="menu-appbar-xs"
              aria-haspopup="true"
              onClick={handleClickMenuXS}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-xs"
              anchorEl={anclaMenuXS}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuXS)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <ListSubheader>Menú Clubes</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/clubs/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de Clubes
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/clubs" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de Clubes
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/clubs/buscar" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Buscar Clubes
                  </Typography>
                </Link>
              </MenuItem>
              <Divider />
              <ListSubheader>Menú Socios</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de Socios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de Socios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios/buscar" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Buscar Socios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios/fecha" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado por Fechas
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/*  */}
          <ScienceTwoToneIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Clubes de Ciencia
          </Typography>

          {/* Menú para resolución md */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Menú para clubes en md */}
            <Button
              onClick={handleClickMenuClubes}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Clubes
            </Button>
            <Menu
              id="menu-clubs"
              anchorEl={anclaMenuClubes}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuClubes)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/clubs/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de Clubes
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/clubs" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de Clubes
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/clubs/buscar" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Buscar Clubes
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
            {/* Menú para socios en md */}
            <Button
              onClick={handleClickMenuSocios}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Socios
            </Button>
            <Menu
              id="menu-peliculas"
              anchorEl={anclaMenuSocios}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuSocios)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de Socios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de Socios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios/buscar" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Buscar Socios
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/socios/fecha" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado por Fechas
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
