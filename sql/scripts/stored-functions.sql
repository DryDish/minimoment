-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Stored Functions
-- ----------------------------------------------------------------------------------------------------------------------------------------
USE `store`;


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- fn_calculate_total -> Calculates the total price after discounts.
-- ----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP FUNCTION IF EXISTS `fn_calculate_total`$$
CREATE FUNCTION `fn_calculate_total`(
    `price` DECIMAL(15, 2),
    `discounted` DECIMAL(15, 2)
    )
RETURNS DECIMAL(15, 2)
DETERMINISTIC
BEGIN
IF `discounted` IS NULL THEN
	RETURN `price`;
ELSE
	RETURN `price` - `discounted`;
END IF;
END $$
DELIMITER ;

-- Example usages
SELECT fn_calculate_total(2,null);
SELECT fn_calculate_total(100, 50);


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- fn_calculate_order_item_price -> Calculates the total price of an order item.
-- ----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP FUNCTION IF EXISTS `fn_calculate_order_item_price`$$
CREATE FUNCTION `fn_calculate_order_item_price`(
    `frame_price` DECIMAL(15, 2),
    `frame_multiplier` DECIMAL(15, 2),
    `paper_price` DECIMAL(15, 2),
    `paper_multiplier` DECIMAL(15, 2),
    `amount` INT
    )
RETURNS DECIMAL(15, 2)
DETERMINISTIC
BEGIN
	RETURN (IFNULL(`frame_price`, 0) * IFNULL(`frame_multiplier`, 0) * IFNULL(`amount`, 0)) + 
		   (IFNULL(`paper_price`, 0) * IFNULL(`paper_multiplier`, 0) * IFNULL(`amount`, 0));
END $$
DELIMITER ;

-- Example usages
SELECT fn_calculate_order_item_price(10, 1.5, 20, 1.2, 10);
SELECT fn_calculate_order_item_price(10, 1.5, 20, null, 10);
SELECT fn_calculate_order_item_price(10, null, 20, 1.2, 10);


-- -------------------------------------------------------------------------------------------------------------
-- fn_get_order_item_price() -> Calculates the order item full price
-- -------------------------------------------------------------------------------------------------------------
-- DELIMITER $$
-- DROP FUNCTION IF EXISTS `fn_get_order_item_price`$$
-- CREATE FUNCTION `fn_get_order_item_price`(`id` INT)
-- RETURNS DECIMAL(15,2)
-- DETERMINISTIC 
-- BEGIN
-- 	-- Getting all the needed ids.
--     --  -> Frames
-- 	SELECT `frame_id` INTO @frame_id FROM `order_items` WHERE `order_item_id` = `id`;
--     SELECT `size_id` INTO @frame_size_id FROM `frames` WHERE `frame_id` = @frames_id;
--     -- -> Paper
--     SELECT `paper_type_id` INTO @paper_id FROM `order_items` WHERE `order_item_id` = `id`;
--     SELECT `size_id` INTO @paper_size_id FROM `paper_types` WHERE `paper_type_id` = @paper_id;
--     
--     -- Getting all the needed data.
--     -- -> Frame data
--     SELECT `price` INTO @frame_size_price FROM `sizes` WHERE `size_id` = @frame_size_id;
--     SELECT `multiplier` INTO @frame_multiplier FROM `frames` WHERE `frame_id` = @frame_id;
--     -- -> Paper data
--     SELECT `price` INTO @paper_size_price FROM `sizes` WHERE `size_id` = @paper_size_id;
--     SELECT `multiplier` INTO @paper_multiplier FROM `paper_types` WHERE `paper_type_id` = @paper_id;
--     -- -> Order Item data
--     SELECT `amount` INTO @amount FROM `order_items` WHERE `order_item_id` = `id`;
--     
--     RETURN fn_calculate_order_item_price
--     (
-- 		@frame_size_price, 
--         @frame_multiplier,
--         @paper_size_price,
--         @paper_multiplier,
--         @amount
-- 	);
-- END $$
-- DELIMITER ;

-- -- Usages
-- SELECT fn_get_order_item_price(2);
