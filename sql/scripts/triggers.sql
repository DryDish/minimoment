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
--  						          * Calculates the money saved on an order item in case it has been created with a pre-existing value.
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


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_roles` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_roles$$
CREATE TRIGGER log_insert_on_roles BEFORE INSERT ON `roles`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.role_id, 'role', NEW.name);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'roles', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;

-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_roles` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_roles$$
CREATE TRIGGER log_update_on_roles BEFORE UPDATE ON `roles`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.role_id, 'role', OLD.name);
		SET new_data = JSON_OBJECT('id', NEW.role_id, 'role', NEW.name);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'roles', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_roles` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_roles$$
CREATE TRIGGER log_delete_on_roles BEFORE DELETE ON `roles`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.role_id, 'role', OLD.name);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'roles', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;

-- Test Data

-- Create trigger
-- INSERT INTO roles VALUES (999, 'test_role');
-- SELECT * FROM audit_logs WHERE new_row_data = JSON_OBJECT("id", 999, "role", "test_role");

-- Update trigger
-- UPDATE roles SET name = 'tester_roles' where role_id  = 999;
-- SELECT * FROM audit_logs WHERE old_row_data = JSON_OBJECT("id", 999, "role", "test_role");

-- Delete trigger
-- DELETE FROM roles WHERE role_id = 999;
-- SELECT * FROM audit_logs WHERE old_row_data = JSON_OBJECT("id", 999, "role", "tester_roles") AND action_type = 'delete';

-- Cleanup -- deletes ALL entries on audit logs from the table roles - Safemode must be off
-- DELETE FROM audit_logs WHERE table_name LIKE 'roles';