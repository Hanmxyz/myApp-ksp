/*
  Warnings:

  - You are about to drop the column `quantity` on the `vendorsale` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `vendorsale` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `vendorsale` table. All the data in the column will be lost.
  - You are about to drop the column `vendorProductId` on the `vendorsale` table. All the data in the column will be lost.
  - You are about to alter the column `profitKsp` on the `vendorsale` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `nip` to the `VendorSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `VendorSale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vendorsale` DROP FOREIGN KEY `VendorSale_vendorProductId_fkey`;

-- DropIndex
DROP INDEX `VendorSale_vendorProductId_fkey` ON `vendorsale`;

-- AlterTable
ALTER TABLE `paymentcreditsale` MODIFY `nip` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `paymentcreditvendorsale` MODIFY `nip` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `vendorsale` DROP COLUMN `quantity`,
    DROP COLUMN `salePrice`,
    DROP COLUMN `subtotal`,
    DROP COLUMN `vendorProductId`,
    ADD COLUMN `nip` VARCHAR(10) NOT NULL,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL,
    MODIFY `profitKsp` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `VendorSaleDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorSaleId` INTEGER NOT NULL,
    `vendorProductId` INTEGER NOT NULL,
    `salePrice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentCreditSale` ADD CONSTRAINT `PaymentCreditSale_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentCreditSale` ADD CONSTRAINT `PaymentCreditSale_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `Member`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorSale` ADD CONSTRAINT `VendorSale_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `Member`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorSaleDetail` ADD CONSTRAINT `VendorSaleDetail_vendorSaleId_fkey` FOREIGN KEY (`vendorSaleId`) REFERENCES `VendorSale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorSaleDetail` ADD CONSTRAINT `VendorSaleDetail_vendorProductId_fkey` FOREIGN KEY (`vendorProductId`) REFERENCES `VendorProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentCreditVendorSale` ADD CONSTRAINT `PaymentCreditVendorSale_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `Member`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;
