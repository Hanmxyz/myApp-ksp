/*
  Warnings:

  - You are about to drop the `duedatesettingdetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `duedatesettingdetail` DROP FOREIGN KEY `dueDateSettingDetail_due_date_id_fkey`;

-- DropTable
DROP TABLE `duedatesettingdetail`;

-- CreateTable
CREATE TABLE `due_date_setting_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `due_date_id` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `late_fee` INTEGER NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `due_date_setting_detail` ADD CONSTRAINT `due_date_setting_detail_due_date_id_fkey` FOREIGN KEY (`due_date_id`) REFERENCES `due_date_settings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
