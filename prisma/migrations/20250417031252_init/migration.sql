/*
  Warnings:

  - You are about to drop the column `isCash` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `sale` table. All the data in the column will be lost.
  - You are about to alter the column `nip` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - Added the required column `PaymentStatus` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMetode` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_nip_fkey`;

-- DropIndex
DROP INDEX `Sale_nip_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `isCash`,
    DROP COLUMN `isPaid`,
    ADD COLUMN `PaymentStatus` ENUM('lunas', 'belum_lunas') NOT NULL,
    ADD COLUMN `paymentMetode` ENUM('cash', 'bon') NOT NULL,
    MODIFY `nip` VARCHAR(10) NOT NULL;

-- CreateTable
CREATE TABLE `PaymentCreditSale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saleId` INTEGER NOT NULL,
    `nip` INTEGER NOT NULL,
    `paymentTotal` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `status` ENUM('lunas', 'cicilan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendorSale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorProductId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `salePrice` INTEGER NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `profitKsp` INTEGER NOT NULL,
    `transactionDate` INTEGER NOT NULL,
    `paymentMetode` ENUM('cash', 'bon') NOT NULL,
    `paymentStatus` ENUM('lunas', 'belum_lunas') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentCreditVendorSale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorSaleId` INTEGER NOT NULL,
    `nip` INTEGER NOT NULL,
    `paymentTotal` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `status` ENUM('lunas', 'cicilan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentVendorSale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorId` INTEGER NOT NULL,
    `paymentTotal` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NULL,
    `status` ENUM('lunas', 'belum_lunas') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `Member`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorSale` ADD CONSTRAINT `VendorSale_vendorProductId_fkey` FOREIGN KEY (`vendorProductId`) REFERENCES `VendorProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentCreditVendorSale` ADD CONSTRAINT `PaymentCreditVendorSale_vendorSaleId_fkey` FOREIGN KEY (`vendorSaleId`) REFERENCES `VendorSale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
