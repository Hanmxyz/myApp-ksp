/*
  Warnings:

  - The `transactionDate` column on the `vendorsale` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `vendorsale` DROP COLUMN `transactionDate`,
    ADD COLUMN `transactionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
