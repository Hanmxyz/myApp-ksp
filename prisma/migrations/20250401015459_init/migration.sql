-- AlterTable
ALTER TABLE `category` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `management` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `managementdetail` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `member` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `image` VARCHAR(100) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `productunit` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `supplier` MODIFY `updatedAt` DATETIME(3) NULL;
