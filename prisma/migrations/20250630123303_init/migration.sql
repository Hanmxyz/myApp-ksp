/*
  Warnings:

  - You are about to drop the column `date` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `late_fee` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_1` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_10` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_11` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_12` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_2` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_3` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_4` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_5` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_6` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_7` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_8` on the `due_date_settings` table. All the data in the column will be lost.
  - You are about to drop the column `month_9` on the `due_date_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `due_date_settings` DROP COLUMN `date`,
    DROP COLUMN `is_active`,
    DROP COLUMN `late_fee`,
    DROP COLUMN `month_1`,
    DROP COLUMN `month_10`,
    DROP COLUMN `month_11`,
    DROP COLUMN `month_12`,
    DROP COLUMN `month_2`,
    DROP COLUMN `month_3`,
    DROP COLUMN `month_4`,
    DROP COLUMN `month_5`,
    DROP COLUMN `month_6`,
    DROP COLUMN `month_7`,
    DROP COLUMN `month_8`,
    DROP COLUMN `month_9`;

-- CreateTable
CREATE TABLE `dueDateSettingDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `due_date_id` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `late_fee` INTEGER NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dueDateSettingDetail` ADD CONSTRAINT `dueDateSettingDetail_due_date_id_fkey` FOREIGN KEY (`due_date_id`) REFERENCES `due_date_settings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
