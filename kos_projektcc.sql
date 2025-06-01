-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 01:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kos_projektcc`
--

-- --------------------------------------------------------

--
-- Table structure for table `daftar_sewa`
--

CREATE TABLE `daftar_sewa` (
  `id_sewa` int(11) NOT NULL,
  `id_penyewa` int(11) NOT NULL,
  `kamar_id` int(11) NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `status_sewa` enum('Aktif','Selesai','Dibatalkan') DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kamar`
--

CREATE TABLE `kamar` (
  `kamar_id` int(11) NOT NULL,
  `no_kamar` varchar(10) NOT NULL,
  `tipe_kamar` enum('Ekonomi','Standar','VIP') NOT NULL,
  `harga` int(11) NOT NULL,
  `status` enum('Kosong','Terisi') DEFAULT 'Kosong'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kamar`
--

INSERT INTO `kamar` (`kamar_id`, `no_kamar`, `tipe_kamar`, `harga`, `status`) VALUES
(1, 'A', 'Ekonomi', 25000, 'Kosong');

-- --------------------------------------------------------

--
-- Table structure for table `penyewa`
--

CREATE TABLE `penyewa` (
  `id_penyewa` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_telp` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'amel', 'amel@gmail.com', '$2b$07$06coA6EX7h5.aZSARLkmVOv11nLf.OLD.YxlTAyShXXAR9WCu5tGK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFtZWwiLCJlbWFpbCI6ImFtZWxAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyNS0wNi0wMVQxMDozMDo1NS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNS0wNi0wMVQxMToxODo0OS4wMDBaIiwiaWF0IjoxNzQ4Nzc3MTQxLCJleHAiOjE3NDg4NjM1NDF9.RwgTJ-hMlbmGromYVdsGen2DrU6ZzpXnP-KutgvHJd4', '2025-06-01 10:30:55', '2025-06-01 11:25:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftar_sewa`
--
ALTER TABLE `daftar_sewa`
  ADD PRIMARY KEY (`id_sewa`),
  ADD KEY `id_penyewa` (`id_penyewa`),
  ADD KEY `kamar_id` (`kamar_id`);

--
-- Indexes for table `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`kamar_id`),
  ADD UNIQUE KEY `no_kamar` (`no_kamar`);

--
-- Indexes for table `penyewa`
--
ALTER TABLE `penyewa`
  ADD PRIMARY KEY (`id_penyewa`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daftar_sewa`
--
ALTER TABLE `daftar_sewa`
  MODIFY `id_sewa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kamar`
--
ALTER TABLE `kamar`
  MODIFY `kamar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penyewa`
--
ALTER TABLE `penyewa`
  MODIFY `id_penyewa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daftar_sewa`
--
ALTER TABLE `daftar_sewa`
  ADD CONSTRAINT `daftar_sewa_ibfk_1` FOREIGN KEY (`id_penyewa`) REFERENCES `penyewa` (`id_penyewa`),
  ADD CONSTRAINT `daftar_sewa_ibfk_2` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`kamar_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
