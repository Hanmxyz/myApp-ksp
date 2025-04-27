/*
  Warnings:

  - Added the required column `subtotal` to the `SaleDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `saledetail` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `subtotal` DOUBLE NOT NULL;
