-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Stored Functions
-- ----------------------------------------------------------------------------------------------------------------------------------------
USE `store`;


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Function `fn_calculate_total` -> Calculates the total price after discounts.
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
-- SELECT fn_calculate_total(2,null);
-- SELECT fn_calculate_total(100, 50);


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Function `fn_calculate_order_item_price` -> Calculates the total price of an order item.
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
-- SELECT fn_calculate_order_item_price(10, 1.5, 20, 1.2, 10);
-- SELECT fn_calculate_order_item_price(10, 1.5, 20, null, 10);
-- SELECT fn_calculate_order_item_price(10, null, 20, 1.2, 10);
