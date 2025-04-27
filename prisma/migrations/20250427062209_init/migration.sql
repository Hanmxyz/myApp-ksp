/*
  Warnings:

  - You are about to drop the column `profitPercent` on the `vendorproduct` table. All the data in the column will be lost.
  - Added the required column `profitKsp` to the `VendorProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vendorproduct` DROP COLUMN `profitPercent`,
    ADD COLUMN `profitKsp` DOUBLE NOT NULL;
