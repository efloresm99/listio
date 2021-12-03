-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2021 a las 09:28:05
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `listio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_lista`
--

CREATE TABLE `items_lista` (
  `idelemento` int(5) NOT NULL,
  `item` varchar(80) NOT NULL,
  `completado` tinyint(1) NOT NULL,
  `idlista` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items_lista`
--

INSERT INTO `items_lista` (`idelemento`, `item`, `completado`, `idlista`) VALUES
(22, 'Carburador', 0, 2),
(23, 'Llanta de repuesto', 1, 2),
(24, 'Líquido de frenos', 0, 2),
(26, 'Juego de parabrisas', 1, 2),
(30, 'Desayunar', 1, 12),
(31, 'Bañarse', 1, 12),
(32, 'Viajar a Comayagua', 0, 12),
(33, 'Hacer turismo', 0, 12),
(34, 'Graduarme del Colegio', 1, 10),
(35, 'Graduarme de la Universidad', 1, 10),
(36, 'Obtener un empleo cool', 0, 10),
(43, 'Forrest Gump', 1, 14),
(44, 'The Green Mile', 1, 14),
(45, 'Red Notice', 0, 14),
(46, 'Coco', 1, 14),
(47, 'Titanic', 1, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `idlista` int(5) NOT NULL,
  `nombrelista` varchar(80) NOT NULL,
  `iduser` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `listas`
--

INSERT INTO `listas` (`idlista`, `nombrelista`, `iduser`) VALUES
(2, 'Lista de auto repuestos', 1),
(10, 'Lista de deseos', 2),
(12, 'Cosas por hacer hoy', 1),
(14, 'Películas para ver', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `iduser` int(3) NOT NULL,
  `username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`iduser`, `username`) VALUES
(1, 'user1'),
(2, 'user2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `items_lista`
--
ALTER TABLE `items_lista`
  ADD PRIMARY KEY (`idelemento`),
  ADD KEY `idlista` (`idlista`);

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`idlista`),
  ADD KEY `idusuario` (`iduser`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `items_lista`
--
ALTER TABLE `items_lista`
  MODIFY `idelemento` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `idlista` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `items_lista`
--
ALTER TABLE `items_lista`
  ADD CONSTRAINT `items_lista_ibfk_1` FOREIGN KEY (`idlista`) REFERENCES `listas` (`idlista`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listas`
--
ALTER TABLE `listas`
  ADD CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
