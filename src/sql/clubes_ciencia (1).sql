-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 12, 2026 at 06:07 PM
-- Server version: 8.0.43
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clubes_ciencia`
--

-- --------------------------------------------------------

--
-- Table structure for table `CLUB`
--

CREATE TABLE `CLUB` (
  `id_club` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_fundacion` date DEFAULT NULL,
  `id_rama` int DEFAULT NULL,
  `presupuesto_anual` decimal(10,2) DEFAULT '0.00',
  `esta_activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CLUB`
--

INSERT INTO `CLUB` (`id_club`, `nombre`, `descripcion`, `direccion`, `fecha_fundacion`, `id_rama`, `presupuesto_anual`, `esta_activo`) VALUES
(22, 'BioGenios del Sur', 'Investigación de ecosistemas locales.', 'Calle del Bosque 45, Sevilla', '2019-03-12', 3, 1500.50, 1),
(23, 'Quantum Physics Group', 'Discusión sobre mecánica cuántica.', 'Av. de las Ciencias 88, Valencia', '2021-09-01', 4, 500.00, 1),
(24, 'Club de Matemáticas Euler', 'Resolución de problemas complejos.', 'Plaza Mayor 10, Salamanca', '2018-01-20', 6, 200.00, 1),
(25, 'GeoMundo', 'Excursiones geológicas y recolección.', 'Camino de la Sierra Km 5', '2020-06-15', 8, 800.75, 1),
(26, 'Robótica Joven', 'Construcción de robots con Arduino.', 'Polígono Industrial Nave 3', '2023-02-10', 2, 3200.00, 1),
(27, 'Amigos del Zoo', 'Voluntariado y estudio animal.', 'Calle Zoológico s/n', '2015-11-30', 9, 0.00, 1),
(28, 'Flora Viva', 'Jardinería y botánica urbana.', 'Parque del Retiro, Puerta 2', '2017-04-22', 10, 650.00, 1),
(29, 'AstroNorte', 'Observación de estrellas y nebulosas.', 'Mirador del Pico 12', '2012-08-14', 1, 4500.00, 1),
(30, 'CodeBreakers', 'Ciberseguridad y hacking ético.', 'Coworking Digital, Sala 4', '2022-12-05', 7, 120.00, 1),
(31, 'Laboratorio de Reacciones', 'Experimentos químicos seguros.', 'Calle Marie Curie 99', '2021-05-18', 5, 2100.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `RAMA`
--

CREATE TABLE `RAMA` (
  `id_rama` int NOT NULL,
  `nombre_rama` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `RAMA`
--

INSERT INTO `RAMA` (`id_rama`, `nombre_rama`) VALUES
(1, 'Astronomía'),
(2, 'Tecnología'),
(3, 'Biología'),
(4, 'Física'),
(5, 'Química'),
(6, 'Matemática'),
(7, 'Informática'),
(8, 'Geología'),
(9, 'Zoológica'),
(10, 'Botánica');

-- --------------------------------------------------------

--
-- Table structure for table `SOCIO`
--

CREATE TABLE `SOCIO` (
  `id_socio` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_club` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `altura_metros` decimal(3,2) DEFAULT NULL,
  `ha_pagado_cuota` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SOCIO`
--

INSERT INTO `SOCIO` (`id_socio`, `nombre`, `apellido`, `email`, `id_club`, `fecha_nacimiento`, `altura_metros`, `ha_pagado_cuota`) VALUES
(31, 'Carla', 'Vázquez', 's1_c22@mail.com', 22, '1990-05-12', 1.65, 1),
(32, 'Juan', 'Pérez', 's2_c22@mail.com', 22, '1992-08-23', 1.75, 0),
(33, 'Marta', 'Gómez', 's3_c22@mail.com', 22, '1988-11-05', 1.60, 1),
(34, 'Pedro', 'Ruiz', 's4_c22@mail.com', 22, '2001-02-14', 1.80, 1),
(35, 'Lucía', 'Sanz', 's5_c22@mail.com', 22, '1995-07-30', 1.68, 0),
(36, 'Diego', 'Mora', 's1_c23@mail.com', 23, '1999-03-10', 1.72, 1),
(37, 'Elena', 'Nuñez', 's2_c23@mail.com', 23, '1994-06-18', 1.63, 1),
(38, 'Javi', 'Lara', 's3_c23@mail.com', 23, '1987-09-22', 1.78, 0),
(39, 'Sara', 'Cano', 's4_c23@mail.com', 23, '2000-12-01', 1.58, 1),
(40, 'Luis', 'Vega', 's5_c23@mail.com', 23, '1993-04-15', 1.82, 0),
(41, 'Ana', 'Rios', 's1_c24@mail.com', 24, '1991-01-20', 1.69, 1),
(42, 'Raúl', 'Gil', 's2_c24@mail.com', 24, '1998-10-11', 1.77, 0),
(43, 'Clara', 'Paz', 's3_c24@mail.com', 24, '2002-05-09', 1.64, 1),
(44, 'Hugo', 'Díaz', 's4_c24@mail.com', 24, '1996-08-27', 1.85, 1),
(45, 'Eva', 'Sola', 's5_c24@mail.com', 24, '1989-11-03', 1.61, 0),
(46, 'Tomás', 'Rey', 's1_c25@mail.com', 25, '1997-02-15', 1.74, 1),
(47, 'Julia', 'León', 's2_c25@mail.com', 25, '1990-06-25', 1.66, 0),
(48, 'Dani', 'Cruz', 's3_c25@mail.com', 25, '1986-12-12', 1.81, 1),
(49, 'Irene', 'Saez', 's4_c25@mail.com', 25, '2001-09-08', 1.59, 0),
(50, 'Marc', 'Boix', 's5_c25@mail.com', 25, '1993-03-30', 1.76, 1),
(51, 'Nora', 'Vila', 's1_c26@mail.com', 26, '1995-04-12', 1.67, 1),
(52, 'Alex', 'Puig', 's2_c26@mail.com', 26, '1999-07-19', 1.79, 1),
(53, 'Lola', 'Ros', 's3_c26@mail.com', 26, '1992-10-21', 1.62, 0),
(54, 'Eric', 'Mas', 's4_c26@mail.com', 26, '1988-01-05', 1.83, 1),
(55, 'Mia', 'Pou', 's5_c26@mail.com', 26, '2003-08-14', 1.55, 0),
(56, 'Pol', 'Roca', 's1_c27@mail.com', 27, '1994-02-28', 1.75, 1),
(57, 'Ona', 'Sala', 's2_c27@mail.com', 27, '1991-11-15', 1.60, 1),
(58, 'Pau', 'Font', 's3_c27@mail.com', 27, '2000-05-20', 1.80, 0),
(59, 'Aina', 'Sol', 's4_c27@mail.com', 27, '1997-09-01', 1.68, 1),
(60, 'Jan', 'Mir', 's5_c27@mail.com', 27, '1989-12-10', 1.78, 1),
(61, 'Leo', 'Bru', 's1_c28@mail.com', 28, '1996-06-06', 1.73, 1),
(62, 'Laia', 'Tur', 's2_c28@mail.com', 28, '1993-03-15', 1.65, 0),
(63, 'Biel', 'Prat', 's3_c28@mail.com', 28, '2002-08-22', 1.82, 1),
(64, 'Mar', 'Coll', 's4_c28@mail.com', 28, '1990-01-30', 1.57, 1),
(65, 'Nil', 'Vall', 's5_c28@mail.com', 28, '1998-10-04', 1.77, 0),
(66, 'Max', 'Reig', 's1_c29@mail.com', 29, '1995-12-25', 1.76, 1),
(67, 'Zoe', 'Cots', 's2_c29@mail.com', 29, '1992-04-18', 1.64, 1),
(68, 'Teo', 'Grau', 's3_c29@mail.com', 29, '1987-07-07', 1.84, 0),
(69, 'Noa', 'Bous', 's4_c29@mail.com', 29, '2001-11-12', 1.61, 1),
(70, 'Kai', 'Palo', 's5_c29@mail.com', 29, '1994-09-29', 1.79, 1),
(71, 'Iris', 'Muro', 's1_c30@mail.com', 30, '1999-02-02', 1.70, 1),
(72, 'Jon', 'Vela', 's2_c30@mail.com', 30, '1991-05-05', 1.81, 0),
(73, 'Ada', 'Gayo', 's3_c30@mail.com', 30, '2003-08-08', 1.58, 1),
(74, 'Unai', 'Pozo', 's4_c30@mail.com', 30, '1996-10-10', 1.75, 1),
(75, 'Lia', 'Cabo', 's5_c30@mail.com', 30, '1988-12-12', 1.63, 0),
(76, 'Gael', 'Olmo', 's1_c31@mail.com', 31, '1993-01-15', 1.78, 1),
(77, 'Alma', 'Roda', 's2_c31@mail.com', 31, '1997-04-24', 1.65, 1),
(78, 'Enzo', 'Losa', 's3_c31@mail.com', 31, '1990-07-30', 1.80, 0),
(79, 'Vera', 'Peña', 's4_c31@mail.com', 31, '2002-11-18', 1.60, 1),
(80, 'Ian', 'Mata', 's5_c31@mail.com', 31, '1995-09-09', 1.74, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CLUB`
--
ALTER TABLE `CLUB`
  ADD PRIMARY KEY (`id_club`),
  ADD KEY `fk_club_rama` (`id_rama`);

--
-- Indexes for table `RAMA`
--
ALTER TABLE `RAMA`
  ADD PRIMARY KEY (`id_rama`);

--
-- Indexes for table `SOCIO`
--
ALTER TABLE `SOCIO`
  ADD PRIMARY KEY (`id_socio`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_socio_club` (`id_club`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CLUB`
--
ALTER TABLE `CLUB`
  MODIFY `id_club` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `RAMA`
--
ALTER TABLE `RAMA`
  MODIFY `id_rama` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `SOCIO`
--
ALTER TABLE `SOCIO`
  MODIFY `id_socio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=356;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CLUB`
--
ALTER TABLE `CLUB`
  ADD CONSTRAINT `fk_club_rama` FOREIGN KEY (`id_rama`) REFERENCES `RAMA` (`id_rama`);

--
-- Constraints for table `SOCIO`
--
ALTER TABLE `SOCIO`
  ADD CONSTRAINT `fk_socio_club` FOREIGN KEY (`id_club`) REFERENCES `CLUB` (`id_club`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
