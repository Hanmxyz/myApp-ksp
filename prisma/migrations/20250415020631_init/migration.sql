/*
  Warnings:

  - You are about to drop the column `supplierCode` on the `purchase` table. All the data in the column will be lost.
  - You are about to alter the column `isPaid` on the `purchase` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(13))`.
  - You are about to drop the column `staffNip` on the `sale` table. All the data in the column will be lost.
  - You are about to alter the column `paymentType` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(10))`.
  - You are about to alter the column `isPaid` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(13))`.
  - You are about to alter the column `isCash` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(13))`.
  - You are about to alter the column `productId` on the `saledetail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `stockId` on the `saledetail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `supplierId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `supplierCode`,
    ADD COLUMN `supplierId` INTEGER NOT NULL,
    MODIFY `isPaid` ENUM('YES', 'NO') NOT NULL;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `staffNip`,
    ADD COLUMN `nip` VARCHAR(191) NOT NULL,
    MODIFY `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `paymentType` ENUM('cash', 'transfer') NOT NULL,
    MODIFY `isPaid` ENUM('YES', 'NO') NOT NULL,
    MODIFY `isCash` ENUM('YES', 'NO') NOT NULL;

-- AlterTable
ALTER TABLE `saledetail` MODIFY `productId` INTEGER NOT NULL,
    MODIFY `stockId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `Member`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetail` ADD CONSTRAINT `SaleDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetail` ADD CONSTRAINT `SaleDetail_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseDetail` ADD CONSTRAINT `PurchaseDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseDetail` ADD CONSTRAINT `PurchaseDetail_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
