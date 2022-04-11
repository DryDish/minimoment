-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Triggers
-- -----------------------------------------------------------------------------------------------------------------------------------------
USE `store`;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `reset_order_price` -> Resets the price and money saved of an order in case they have been created with a pre-existing value.
-- -----------------------------------------------------------------------------------------------------------------------------------------
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


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `calculate_order_price` -> * Calculates the price of an order when an order item for it is created. 
-- 						              * Calculates the price of an order item in case it have been created with a pre-existing value.
--  						          * Resets the money saved on an order item in case it has been created with a pre-existing value.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS calculate_order_price$$
CREATE TRIGGER calculate_order_price BEFORE INSERT ON `order_items`
	FOR EACH ROW
		BEGIN
            -- Calculate order item price.
            CALL get_order_item_price(NEW.`frame_id`, NEW.`paper_type_id`, NEW.`amount`, @order_item_price);
            SET NEW.`order_item_price` = @order_item_price;
            -- Calculate order items price saved.
            CALL get_order_item_price_saved(NEW.`frame_id`, NEW.`paper_type_id`, NEW.`amount`, @order_item_price_saved);
            SET NEW.`price_saved` = @order_item_price_saved;
			
            -- Recalculate order price and price saved to account for the new order item.
			UPDATE `orders` SET 
				`order_price` = `order_price` + @order_item_price, 
                `total_price_saved` = `total_price_saved` + @order_item_price_saved
			WHERE `orders`.`order_id` = NEW.`order_id`;
		END; $$
DELIMITER ;
