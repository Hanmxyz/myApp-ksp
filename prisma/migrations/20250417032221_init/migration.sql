/*
  Warnings:

  - You are about to drop the column `PaymentStatus` on the `sale` table. All the data in the column will be lost.
  - Added the required column `paymentStatus` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `PaymentStatus`,
    ADD COLUMN `paymentStatus` ENUM('lunas', 'belum_lunas') NOT NULL;
