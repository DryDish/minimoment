-- -------------------------------------------------------------------------------------------------------------
-- Stored Procedures
-- -------------------------------------------------------------------------------------------------------------
USE `store`;

-- -------------------------------------------------------------------------------------------------------------
-- use_discount(id) -> Decrements the amount of remaining uses for the given discount.
-- -------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS use_discount$$
CREATE PROCEDURE use_discount(IN `id` INT) 
BEGIN
UPDATE `discount_codes` SET `remaining_uses` = `remaining_uses` - 1 WHERE `discount_code_id` = `id`;
END $$
DELIMITER ;

-- Usages
-- SELECT `remaining_uses` FROM `discount_codes` WHERE `discount_code_id` = 1;
-- CALL use_discount(1);


-- -------------------------------------------------------------------------------------------------------------
-- get_revenue() -> Calculates and retrieves the revenue generated within the given range of year and month.
-- -------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS get_revenue$$
CREATE PROCEDURE get_revenue(IN `start` DATETIME, IN `end` DATETIME, OUT `revenue` DECIMAL(15,2)) 
BEGIN
	SELECT SUM(fn_calculate_total(`order_price`, `total_price_saved`)) 
		INTO `revenue`
    FROM `orders` 
		WHERE YEAR(`created_at`) >= YEAR(`start`) AND YEAR(`created_at`) <= YEAR(`end`) AND
			  MONTH(`created_at`) >= MONTH(`start`) AND MONTH(`created_at`) <= MONTH(`end`);
END $$
DELIMITER ;

-- Usages
-- CALL get_revenue(NOW() - INTERVAL 1 MONTH, NOW(), @test_revenue);
-- SELECT @test_revenue;


-- -------------------------------------------------------------------------------------------------------------
-- get_products_sold() -> Retrieves the amount of products sold within the given range of year and month.
-- -------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS get_products_sold$$
CREATE PROCEDURE get_products_sold(IN `start` DATETIME, IN `end` DATETIME, IN `count_pictures` BOOLEAN, IN `count_frames` BOOLEAN, OUT `total` INT) 
BEGIN
	SELECT 
		SUM(
			IFNULL((SELECT SUM((
				IFNULL((`picture_data_id` / `picture_data_id` * `amount`),0) 
					* `count_pictures` + 
				IFNULL((`frame_id` / `frame_id` * `amount`),0) 
					* `count_frames`)) 
			FROM `order_items` WHERE `order_items`.`order_id` = `orders`.`order_id`),0))
		INTO `total`
	FROM `orders` 
    WHERE YEAR(`created_at`) >= YEAR(`start`) AND YEAR(`created_at`) <= YEAR(`end`) AND
		  MONTH(`created_at`) >= MONTH(`start`) AND MONTH(`created_at`) <= MONTH(`end`);
END $$
DELIMITER ;

-- Usages
-- Pictures & Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, true, @test_total);
-- No Pictures & Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, true, @test_total);
-- Pictures & No Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, false, @test_total);
-- No Pictures & No Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, false, @test_total);

-- SELECT @test_total;


-- -------------------------------------------------------------------------------------------------------------
-- get_order_item_price() -> Calculates the order item full price
-- -------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS get_order_item_price$$
CREATE PROCEDURE get_order_item_price(IN `id` INT, IN `frame` INT, IN `paper` INT, IN `amount` DECIMAL(15, 2), OUT `total` DECIMAL(15, 2)) 
BEGIN
	-- Getting all the needed ids.
    --  -> Frames
	-- SELECT `frame_id` INTO @frame_id FROM `order_items` WHERE `order_item_id` = `id`;
    SELECT `size_id` INTO @frame_size_id FROM `frames` WHERE `frames`.`frame_id` = `frame`;
    -- -> Paper
    -- SELECT `paper_type_id` INTO @paper_id FROM `order_items` WHERE `order_item_id` = `id`;
    SELECT `size_id` INTO @paper_size_id FROM `paper_types` WHERE `paper_types`.`paper_type_id` = `paper`;
    
    -- Getting all the needed data.
    -- -> Frame data
    SELECT `price` INTO @frame_size_price FROM `sizes` WHERE `size_id` = @frame_size_id;
    SELECT `multiplier` INTO @frame_multiplier FROM `frames` WHERE `frames`.`frame_id` = `frame`;
    -- -> Paper data
    SELECT `price` INTO @paper_size_price FROM `sizes` WHERE `size_id` = @paper_size_id;
    SELECT `multiplier` INTO @paper_multiplier FROM `paper_types` WHERE `paper_types`.`paper_type_id` = `paper`;
    
    SELECT fn_calculate_order_item_price
    (
		@frame_size_price, 
        @frame_multiplier,
        @paper_size_price,
        @paper_multiplier,
        `amount`
	) 
    INTO `total`;
END $$
DELIMITER ;

-- Usages
CALL get_order_item_price(1, 4, 6, 2, @test_price);
SELECT @test_price;


