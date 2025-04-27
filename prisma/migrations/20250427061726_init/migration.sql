/*
  Warnings:

  - Added the required column `profitKsp` to the `VendorSaleDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vendorsaledetail` ADD COLUMN `profitKsp` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `OperationalCost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staff` VARCHAR(20) NOT NULL,
    `description` TEXT NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
