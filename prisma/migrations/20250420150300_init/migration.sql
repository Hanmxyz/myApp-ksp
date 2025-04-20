/*
  Warnings:

  - You are about to alter the column `paymentTotal` on the `paymentcreditsale` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `paymentcreditsale` MODIFY `paymentTotal` DOUBLE NOT NULL,
    MODIFY `paymentDate` DATETIME(3) NULL;
