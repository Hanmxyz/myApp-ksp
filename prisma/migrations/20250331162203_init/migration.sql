/*
  Warnings:

  - The primary key for the `supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aktif` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `kode_sup` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `no_HP` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `perusahaan` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the `petugas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbanggota` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbbarang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbdetail_pengurus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbkategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbpengurus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbsatuan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbbarang` DROP FOREIGN KEY `tbBarang_kode_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `tbdetail_pengurus` DROP FOREIGN KEY `tbDetail_Pengurus_kode_pengurus_fkey`;

-- AlterTable
ALTER TABLE `supplier` DROP PRIMARY KEY,
    DROP COLUMN `aktif`,
    DROP COLUMN `alamat`,
    DROP COLUMN `kode_sup`,
    DROP COLUMN `nama`,
    DROP COLUMN `no_HP`,
    DROP COLUMN `perusahaan`,
    ADD COLUMN `address` TEXT NOT NULL,
    ADD COLUMN `code` VARCHAR(10) NOT NULL,
    ADD COLUMN `company` VARCHAR(100) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(15) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `petugas`;

-- DropTable
DROP TABLE `tbanggota`;

-- DropTable
DROP TABLE `tbbarang`;

-- DropTable
DROP TABLE `tbdetail_pengurus`;

-- DropTable
DROP TABLE `tbkategori`;

-- DropTable
DROP TABLE `tbpengurus`;

-- DropTable
DROP TABLE `tbsatuan`;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `purchasePrice` INTEGER NOT NULL,
    `retailPrice` INTEGER NOT NULL,
    `wholesalePrice` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `minStock` INTEGER NOT NULL,
    `barcode` VARCHAR(50) NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `unit` VARCHAR(20) NOT NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductUnit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `nip` VARCHAR(10) NOT NULL,
    `name` VARCHAR(50) NULL,
    `accountNumber` VARCHAR(20) NOT NULL,
    `bank` VARCHAR(20) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `address` TEXT NOT NULL,
    `creditLimit` INTEGER NOT NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Member_accountNumber_key`(`accountNumber`),
    PRIMARY KEY (`nip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Management` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ManagementDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` YEAR NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `managementId` INTEGER NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `allowance` DECIMAL(10, 2) NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staffCode` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isActive` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `level` ENUM('admin', 'kasir') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Staff_staffCode_key`(`staffCode`),
    UNIQUE INDEX `Staff_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_code_key` ON `Supplier`(`code`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ManagementDetail` ADD CONSTRAINT `ManagementDetail_managementId_fkey` FOREIGN KEY (`managementId`) REFERENCES `Management`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
