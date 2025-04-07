/*
  Warnings:

  - You are about to drop the column `staffCode` on the `staff` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Staff_staffCode_key` ON `staff`;

-- AlterTable
ALTER TABLE `staff` DROP COLUMN `staffCode`;
