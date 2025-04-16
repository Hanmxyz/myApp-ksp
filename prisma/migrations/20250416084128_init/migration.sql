-- DropForeignKey
ALTER TABLE `saledetail` DROP FOREIGN KEY `SaleDetail_stockId_fkey`;

-- DropIndex
DROP INDEX `SaleDetail_stockId_fkey` ON `saledetail`;
