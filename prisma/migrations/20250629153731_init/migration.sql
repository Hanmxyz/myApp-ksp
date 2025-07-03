-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `purchase_price` INTEGER NOT NULL,
    `retail_price` INTEGER NOT NULL,
    `bon_price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `min_stock` INTEGER NOT NULL,
    `barcode` VARCHAR(50) NOT NULL,
    `image` VARCHAR(100) NULL,
    `category_id` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `products_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_units` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `nip` VARCHAR(20) NOT NULL,
    `name` VARCHAR(50) NULL,
    `account_number` VARCHAR(20) NOT NULL,
    `bank` VARCHAR(20) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `address` TEXT NOT NULL,
    `credit_limit` INTEGER NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `members_account_number_key`(`account_number`),
    PRIMARY KEY (`nip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mobiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(20) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user_mobiles_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `managements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `management_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` YEAR NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `management_id` INTEGER NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `allowance` DECIMAL(10, 2) NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` TEXT NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `company` VARCHAR(100) NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staffs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone_number` VARCHAR(15) NOT NULL,
    `userId` INTEGER NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `address` TEXT NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_id` INTEGER NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `sell_price` DOUBLE NOT NULL,
    `profit_ksp` DOUBLE NOT NULL,
    `entry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `purchase_price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `entry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nip` VARCHAR(20) NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `payment_type` ENUM('cash', 'transfer') NOT NULL,
    `payment_status` ENUM('lunas', 'belum_lunas') NOT NULL,
    `payment_metode` ENUM('cash', 'bon') NOT NULL,
    `total_payment` DOUBLE NOT NULL,
    `change` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `stock_id` INTEGER NOT NULL,
    `purchase_price` DOUBLE NOT NULL,
    `sale_price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchase_date` DATETIME(3) NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `is_paid` ENUM('YES', 'NO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchase_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `stock_id` INTEGER NOT NULL,
    `purchase_price` DOUBLE NOT NULL,
    `retail_price` DOUBLE NOT NULL,
    `bon_price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_credit_sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_id` INTEGER NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `payment_total` DOUBLE NOT NULL,
    `payment_date` DATETIME(3) NULL,
    `status` ENUM('lunas', 'cicilan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(20) NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `profit_ksp` DOUBLE NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_metode` ENUM('cash', 'bon') NOT NULL,
    `payment_status` ENUM('lunas', 'belum_lunas') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_sale_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_sale_id` INTEGER NOT NULL,
    `vendor_product_id` INTEGER NOT NULL,
    `sale_price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `profit_ksp` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_credit_vendor_sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_sale_id` INTEGER NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `payment_total` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `status` ENUM('lunas', 'cicilan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_vendor_sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_id` INTEGER NOT NULL,
    `payment_total` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('lunas', 'belum_lunas') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operational_costs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staff` VARCHAR(20) NOT NULL,
    `description` TEXT NOT NULL,
    `cost` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `savings_loans_settings` (
    `id` INTEGER NOT NULL,
    `shu_saving` INTEGER NOT NULL,
    `basic_saving` INTEGER NOT NULL,
    `mandatory_saving` INTEGER NOT NULL,
    `member_loan_interest_rate` DOUBLE NOT NULL,
    `management_loan_interest_rate` DOUBLE NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `due_date_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `month_1` INTEGER NOT NULL,
    `month_2` INTEGER NOT NULL,
    `month_3` INTEGER NOT NULL,
    `month_4` INTEGER NOT NULL,
    `month_5` INTEGER NOT NULL,
    `month_6` INTEGER NOT NULL,
    `month_7` INTEGER NOT NULL,
    `month_8` INTEGER NOT NULL,
    `month_9` INTEGER NOT NULL,
    `month_10` INTEGER NOT NULL,
    `month_11` INTEGER NOT NULL,
    `month_12` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `late_fee` INTEGER NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `loan_term` INTEGER NOT NULL,
    `loan_amount` DOUBLE NOT NULL,
    `status` ENUM('accepted', 'rejected') NULL,
    `description` VARCHAR(200) NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `loan_amount` DOUBLE NOT NULL,
    `loan_term` INTEGER NOT NULL,
    `monthly_payment` DOUBLE NOT NULL,
    `is_paid` ENUM('lunas', 'belum_lunas') NOT NULL DEFAULT 'belum_lunas',
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan_repayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_id` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_amount` DOUBLE NOT NULL,
    `penalty` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `days_late` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `savings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `nip` VARCHAR(20) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount` DOUBLE NOT NULL,
    `type` ENUM('basic', 'mandatory') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voluntary_saving_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(20) NOT NULL,
    `year` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `is_active` ENUM('YES', 'NO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoluntarySavingPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voluntary_saving_setting_id` INTEGER NOT NULL,
    `amount_paid` DOUBLE NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `is_paid` ENUM('YES', 'NO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AllTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(20) NOT NULL,
    `type_tx` ENUM('saving', 'loan', 'loan_repayment', 'withdrawal', 'sale') NULL,
    `total_amount` DOUBLE NULL,
    `created_at` DATETIME(3) NULL,
    `sale_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `product_units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mobiles` ADD CONSTRAINT `user_mobiles_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `management_details` ADD CONSTRAINT `management_details_management_id_fkey` FOREIGN KEY (`management_id`) REFERENCES `managements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staffs` ADD CONSTRAINT `staffs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendor_products` ADD CONSTRAINT `vendor_products_vendor_id_fkey` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendor_products` ADD CONSTRAINT `vendor_products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stocks` ADD CONSTRAINT `stocks_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_details` ADD CONSTRAINT `sale_details_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_details` ADD CONSTRAINT `sale_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_details` ADD CONSTRAINT `purchase_details_purchase_id_fkey` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_details` ADD CONSTRAINT `purchase_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_details` ADD CONSTRAINT `purchase_details_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_credit_sales` ADD CONSTRAINT `payment_credit_sales_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_credit_sales` ADD CONSTRAINT `payment_credit_sales_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendor_sales` ADD CONSTRAINT `vendor_sales_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendor_sale_details` ADD CONSTRAINT `vendor_sale_details_vendor_sale_id_fkey` FOREIGN KEY (`vendor_sale_id`) REFERENCES `vendor_sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendor_sale_details` ADD CONSTRAINT `vendor_sale_details_vendor_product_id_fkey` FOREIGN KEY (`vendor_product_id`) REFERENCES `vendor_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_credit_vendor_sales` ADD CONSTRAINT `payment_credit_vendor_sales_vendor_sale_id_fkey` FOREIGN KEY (`vendor_sale_id`) REFERENCES `vendor_sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_credit_vendor_sales` ADD CONSTRAINT `payment_credit_vendor_sales_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `savings_loans_settings` ADD CONSTRAINT `savings_loans_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `due_date_settings` ADD CONSTRAINT `due_date_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan_requests` ADD CONSTRAINT `loan_requests_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan_requests` ADD CONSTRAINT `loan_requests_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan_repayments` ADD CONSTRAINT `loan_repayments_loan_id_fkey` FOREIGN KEY (`loan_id`) REFERENCES `loans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `savings` ADD CONSTRAINT `savings_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voluntary_saving_settings` ADD CONSTRAINT `voluntary_saving_settings_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoluntarySavingPayment` ADD CONSTRAINT `VoluntarySavingPayment_voluntary_saving_setting_id_fkey` FOREIGN KEY (`voluntary_saving_setting_id`) REFERENCES `voluntary_saving_settings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AllTransaction` ADD CONSTRAINT `AllTransaction_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `members`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AllTransaction` ADD CONSTRAINT `AllTransaction_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
