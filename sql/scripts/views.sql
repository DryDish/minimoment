-- --------------------------------------------------------------------
-- Views
-- --------------------------------------------------------------------
USE `store`;


-- --------------------------------------------------------------------
-- View `customer_info`
-- --------------------------------------------------------------------
DROP VIEW IF EXISTS `customer_info`;

CREATE VIEW `customer_info`
AS SELECT 
    `users`.`user_id` AS `customer_id`,
    `users`.`first_name`,
    `users`.`last_name`,
    `contact_info`.`phone_number`,
    `contact_info`.`country_code`,
    `contact_info`.`city`,
    `contact_info`.`postal_code`,
    `contact_info`.`address_one`,
    `contact_info`.`address_two`
FROM `users` INNER JOIN `contact_info` ON `users`.`contact_info_id`=`contact_info`.`contact_info_id`;


-- --------------------------------------------------------------------
-- View `invoice_data`
-- --------------------------------------------------------------------
DROP VIEW IF EXISTS `invoice_data`;

CREATE VIEW `invoice_data` AS
    SELECT 
        `orders`.`order_id`,
        `orders`.`created_at`,
        `orders`.`order_price`,
        `orders`.`total_price_saved`,
        `fn_calculate_total`(`orders`.`order_price`, `orders`.`total_price_saved`) AS `final_price`,
        `discount_codes`.`name` AS `discount_code`,
        `customer_info`.`first_name`,
		`customer_info`.`last_name`,
		`customer_info`.`phone_number`,
		`customer_info`.`country_code`,
		`customer_info`.`city`,
		`customer_info`.`postal_code`,
		`customer_info`.`address_one`,
		`customer_info`.`address_two`,
        `contact_info`.`phone_number` AS `billing_phone_number`,
        `contact_info`.`country_code` AS `billing_country_code`,
        `contact_info`.`city` AS `billing_city`,
        `contact_info`.`postal_code` AS `billing_postal_code`,
        `contact_info`.`address_one` AS `billing_address_one`,
        `contact_info`.`address_two` AS `billing_address_two`
	FROM `orders`
        INNER JOIN `discount_codes` ON `orders`.`discount_code_id` = `discount_codes`.`discount_code_id`
        INNER JOIN `customer_info` ON `orders`.`user_id` = `customer_info`.`customer_id`
        INNER JOIN `contact_info` ON `orders`.`billing_contact_info_id` = `contact_info`.`contact_info_id`;