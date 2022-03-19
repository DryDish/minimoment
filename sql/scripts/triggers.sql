-- -------------------------------------------------------------------------------------------------------------------------------------
-- Triggers
-- -------------------------------------------------------------------------------------------------------------------------------------
USE `store`;


-- -------------------------------------------------------------------------------------------------------------------------------------
-- reset_order_price -> Resets the price and money saved of an order in case they have been created with a pre-existing value.
-- -------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS reset_order_price$$
CREATE TRIGGER reset_order_price BEFORE INSERT ON `orders`
	FOR EACH ROW
		BEGIN
			IF NEW.`order_price` != 0 THEN
				SET NEW.`order_price` = 0;
			END IF;
			IF NEW.`total_price_saved` != 0 THEN
				SET NEW.`total_price_saved` = 0;
			END IF;
		END; $$
DELIMITER ;


-- -------------------------------------------------------------------------------------------------------------------------------------
-- calculate_order_price -> Calculates the price of an order when an order item for it is created. 
-- 						    Calculates the price of an order item in case it have been created with a pre-existing value.
--  						Resets the money saved on an order item in case it has been created with a pre-existing value.
-- -------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS calculate_order_price$$
CREATE TRIGGER calculate_order_price BEFORE INSERT ON `order_items`
	FOR EACH ROW
		BEGIN
            CALL get_order_item_price(NEW.`order_item_id`, NEW.`frame_id`, NEW.`paper_type_id`, NEW.`amount`, @price);
            SET NEW.`order_item_price` = @price;
            SET NEW.`price_saved` = 0;
            
			UPDATE `orders` SET `order_price` = `order_price` + @price WHERE `orders`.`order_id` = NEW.`order_id`;
		END; $$
DELIMITER ;
