-- -------------------------------------------------------------------------------------------------------------
-- Stored Procedures
-- -------------------------------------------------------------------------------------------------------------
USE `store`;

-- -------------------------------------------------------------------------------------------------------------------------
-- Procedure `use_discount` -> Decrements the amount of remaining uses for the given discount.
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS use_discount$$
CREATE PROCEDURE use_discount(IN `id` INT) 
BEGIN
	UPDATE `discount_codes` SET `remaining_uses` = `remaining_uses` - 1 WHERE `discount_code_id` = `id`;
END $$
DELIMITER ;

-- Usages
-- SELECT `remaining_uses` FROM `discount_codes` WHERE `discount_code_id` = 1; -- 1. Check out current value.
-- CALL use_discount(1);														-- 2. Use once.
-- SELECT `remaining_uses` FROM `discount_codes` WHERE `discount_code_id` = 1; -- 3. Check out new value.


-- -------------------------------------------------------------------------------------------------------------------------
-- Procedure `get_revenue` -> Calculates and retrieves the revenue generated within the given range of year and month.
-- -------------------------------------------------------------------------------------------------------------------------
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
-- CALL get_revenue(NOW() - INTERVAL 1 MONTH, NOW(), @test_revenue); -- Retrieve the revenue for the past month.
-- SELECT @test_revenue;											  -- Check out the revenue.


-- -------------------------------------------------------------------------------------------------------------------------
-- Procedure `get_products_sold` -> Retrieves the amount of products sold within the given range of year and month.
-- -------------------------------------------------------------------------------------------------------------------------
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
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, true, @test_products_amount); -- Retrieve how many frames and pictures were sold last month.
-- SELECT @test_products_amount;																-- Check out the amount.

-- No Pictures & Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, true, @test_products_amount); -- Retrieve how many frames were sold last month.
-- SELECT @test_products_amount;      															 -- Check out the amount.

-- Pictures & No Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, false, @test_products_amount); -- Retrieve how many and pictures were sold last month.
-- SELECT @test_products_amount;																 -- Check out the amount.

-- No Pictures & No Frames
-- CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, false, @test_products_amount); 
-- SELECT @test_products_amount;																 -- Check out the amount.
	



-- -------------------------------------------------------------------------------------------------------------------------
-- Procedure `get_order_item_price` -> Calculates the order item full price
--                     	*Needs Refactoring*
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS get_order_item_price$$
CREATE PROCEDURE get_order_item_price(IN `frame` INT, IN `paper` INT, IN `amount` DECIMAL(15, 2), OUT `total` DECIMAL(15, 2)) 
BEGIN
	-- Getting all the needed ids.
	SELECT `size_id` INTO @frame_size_id FROM `frames` WHERE `frames`.`frame_id` = `frame`;
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
-- CALL get_order_item_price(4, 6, 2, @test_order_item_price); -- Calculate the full price of an order item.
-- SELECT @test_order_item_price;								   -- Check out the price.


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Procedure `insert_log` -> Inserts a log with the provided data
-- ----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS insert_log$$
CREATE PROCEDURE insert_log(
		IN `user` VARCHAR(255),
        IN `table_name` VARCHAR(50),
        IN `action_type` ENUM('insert', 'update', 'delete'),
		IN `old_row_data` JSON,
        IN `new_row_data` JSON
)
BEGIN
	INSERT INTO `audit_logs` VALUES(
		DEFAULT,
        `user`,
		DEFAULT,
        `table_name`,
        `action_type`,
        `old_row_data`,
        `new_row_data`
	);
END $$
DELIMITER ;


-- -------------------------------------------------------------------------------------------------------------------------
-- Procedure `get_order_item_price_saved` -> Calculates the order item full price
--                     	*Needs Refactoring*
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS get_order_item_price_saved$$
CREATE PROCEDURE get_order_item_price_saved(IN `frame` INT, IN `paper` INT, IN `amount` DECIMAL(15, 2), OUT `saved` DECIMAL(15, 2)) 
BEGIN
	-- Getting all the needed ids.
	SELECT `size_id` INTO @frame_size_id FROM `frames` WHERE `frames`.`frame_id` = `frame`;
	SELECT `discount_code_id` INTO @frame_discount_id FROM `frames` WHERE `frames`.`frame_id` = `frame`;
	SELECT `size_id` INTO @paper_size_id FROM `paper_types` WHERE `paper_types`.`paper_type_id` = `paper`;
	SELECT `discount_code_id` INTO @paper_discount_id FROM `paper_types` WHERE `paper_types`.`paper_type_id` = `paper`;
	
	-- Getting all the needed data.
	
	-- -> Frame data
	SELECT `price` INTO @frame_size_price FROM `sizes` WHERE `size_id` = @frame_size_id;
	SELECT `multiplier` INTO @frame_multiplier FROM `frames` WHERE `frames`.`frame_id` = `frame`;
	-- -> Frame discount
	SELECT `value` INTO @frame_discount_value FROM `discount_codes` WHERE `discount_codes`.`discount_code_id` = @frame_discount_id;
	SELECT `name` INTO @frame_discount_type FROM `discount_types` WHERE `discount_types`.`discount_type_id` = 
	(
		SELECT `discount_type_id` FROM `discount_codes` WHERE `discount_codes`.`discount_code_id` = @frame_discount_id
	);
	
	-- -> Paper data
	SELECT `price` INTO @paper_size_price FROM `sizes` WHERE `size_id` = @paper_size_id;
	SELECT `multiplier` INTO @paper_multiplier FROM `paper_types` WHERE `paper_types`.`paper_type_id` = `paper`;
	-- -> Paper discount
	SELECT `value` INTO @paper_discount_value FROM `discount_codes` WHERE `discount_codes`.`discount_code_id` = @paper_discount_id;
	SELECT `name` INTO @paper_discount_type FROM `discount_types` WHERE `discount_types`.`discount_type_id` = 
	(
		SELECT `discount_type_id` FROM `discount_codes` WHERE `discount_codes`.`discount_code_id` = @paper_discount_id
	);

	-- -> Calculating discounts
	-- -> Frame
	SELECT fn_calculate_discount(
		@frame_discount_value,
		@frame_discount_type,
		@frame_size_price * @frame_multiplier,
		`amount`
	) INTO @frame_price_saved;
	-- -> Paper
	SELECT fn_calculate_discount(
		@paper_discount_value,
		@paper_discount_type,
		@paper_size_price * @paper_multiplier,
		`amount`
	) INTO @paper_price_saved;
	
	SELECT @frame_price_saved + @paper_price_saved INTO `saved`;
    
END $$
DELIMITER ;

-- Usages
-- CALL get_order_item_price_saved(4, 6, 2, @test_order_item_price_saved);  -- Calculate the price saved of an order item.
-- SELECT @test_order_item_price_saved;								        -- Check out the price.