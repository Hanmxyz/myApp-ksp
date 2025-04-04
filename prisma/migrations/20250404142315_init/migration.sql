/*
  Warnings:

  - You are about to drop the column `code` on the `supplier` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Supplier_code_key` ON `supplier`;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `code`;
