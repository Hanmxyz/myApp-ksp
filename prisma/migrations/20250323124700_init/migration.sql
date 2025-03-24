/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `tbKategori` (
    `kode_kategori` VARCHAR(10) NOT NULL,
    `nama` VARCHAR(40) NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',

    PRIMARY KEY (`kode_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbBarang` (
    `kode_barang` VARCHAR(10) NOT NULL,
    `nama_barang` VARCHAR(40) NOT NULL,
    `hargaBeli` INTEGER NOT NULL,
    `hargaEcer` INTEGER NOT NULL,
    `hargaGrosir` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `stock_min` INTEGER NOT NULL,
    `barcode` VARCHAR(50) NOT NULL,
    `gambar` VARCHAR(100) NOT NULL,
    `kode_kategori` VARCHAR(10) NOT NULL,
    `ukuran` INTEGER NOT NULL,
    `satuan` VARCHAR(20) NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',

    UNIQUE INDEX `tbBarang_barcode_key`(`barcode`),
    PRIMARY KEY (`kode_barang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbSatuan` (
    `kode_satuan` VARCHAR(10) NOT NULL,
    `nama` VARCHAR(40) NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',

    PRIMARY KEY (`kode_satuan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbAnggota` (
    `NIP` VARCHAR(10) NOT NULL,
    `Nama_Anggota` VARCHAR(50) NULL,
    `Nomor_rekening` VARCHAR(20) NOT NULL,
    `bank` VARCHAR(20) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `Alamat` TEXT NOT NULL,
    `Limit_Piutang` INTEGER NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',

    UNIQUE INDEX `tbAnggota_Nomor_rekening_key`(`Nomor_rekening`),
    PRIMARY KEY (`NIP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbDetail_Pengurus` (
    `kode_detail` VARCHAR(10) NOT NULL,
    `tahun` YEAR NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `kode_pengurus` VARCHAR(20) NOT NULL,
    `tgl_menjabat` DATE NOT NULL,
    `tgl_akhirmenjabat` DATE NOT NULL,
    `tunjangan` DECIMAL(10, 2) NULL,
    `aktif` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',

    PRIMARY KEY (`kode_detail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbPengurus` (
    `kode_pengurus` VARCHAR(10) NOT NULL,
    `nama` VARCHAR(50) NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',

    PRIMARY KEY (`kode_pengurus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `kode_sup` VARCHAR(10) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `alamat` TEXT NOT NULL,
    `no_HP` VARCHAR(15) NOT NULL,
    `perusahaan` VARCHAR(100) NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL,

    PRIMARY KEY (`kode_sup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Petugas` (
    `kode_petugas` VARCHAR(10) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `pass` VARCHAR(255) NOT NULL,
    `aktif` ENUM('yes', 'no') NOT NULL,
    `level` ENUM('admin', 'kasir') NOT NULL,

    UNIQUE INDEX `Petugas_username_key`(`username`),
    PRIMARY KEY (`kode_petugas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbBarang` ADD CONSTRAINT `tbBarang_kode_kategori_fkey` FOREIGN KEY (`kode_kategori`) REFERENCES `tbKategori`(`kode_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbDetail_Pengurus` ADD CONSTRAINT `tbDetail_Pengurus_kode_pengurus_fkey` FOREIGN KEY (`kode_pengurus`) REFERENCES `tbPengurus`(`kode_pengurus`) ON DELETE RESTRICT ON UPDATE CASCADE;
