-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Audit Triggers
-- -----------------------------------------------------------------------------------------------------------------------------------------
use `store`;


-- *****************************************************************************************************************************************
-- Roles Table Audit
-- *****************************************************************************************************************************************

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
			SET new_data = JSON_OBJECT('id', NEW.`role_id`, 'role', NEW.`name`);
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
		SET old_data = JSON_OBJECT('id', OLD.`role_id`, 'role', OLD.`name`);
		SET new_data = JSON_OBJECT('id', NEW.`role_id`, 'role', NEW.`name`);
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
		SET old_data = JSON_OBJECT('id', OLD.`role_id`, 'role', OLD.`name`);
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


-- *****************************************************************************************************************************************
-- Contact_Info Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Discount_Codes Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Discount_Types Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Users Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Sizes Table Audit
-- *****************************************************************************************************************************************

-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_sizes` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_sizes$$
CREATE TRIGGER log_insert_on_sizes BEFORE INSERT ON `sizes`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`size_id`, 'name', NEW.`name`, 'width_mm', NEW.`width_mm`, 'height_mm', NEW.`height_mm`, 'price', NEW.`price`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'sizes', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_sizes` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_sizes$$
CREATE TRIGGER log_update_on_sizes BEFORE UPDATE ON `sizes`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`size_id`, 'name', OLD.`name`, 'width_mm', OLD.`width_mm`, 'height_mm', OLD.`height_mm`, 'price', OLD.`price`);
		SET new_data = JSON_OBJECT('id', NEW.`size_id`, 'name', NEW.`name`, 'width_mm', NEW.`width_mm`, 'height_mm', NEW.`height_mm`, 'price', NEW.`price`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'sizes', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_sizes` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_sizes$$
CREATE TRIGGER log_delete_on_sizes BEFORE DELETE ON `sizes`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`size_id`, 'name', OLD.`name`, 'width_mm', OLD.`width_mm`, 'height_mm', OLD.`height_mm`, 'price', OLD.`price`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'sizes', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- *****************************************************************************************************************************************
-- Frames Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Paper_Types Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Picture_Data Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Statuses Table Audit
-- *****************************************************************************************************************************************

-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_statuses` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_statuses$$
CREATE TRIGGER log_insert_on_statuses BEFORE INSERT ON `statuses`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`status_id`, 'name', NEW.`name`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'statuses', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_statuses` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_statuses$$
CREATE TRIGGER log_update_on_statuses BEFORE UPDATE ON `statuses`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`status_id`, 'name', OLD.`name`);
		SET new_data = JSON_OBJECT('id', NEW.`status_id`, 'name', NEW.`name`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'statuses', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_statuses` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_statuses$$
CREATE TRIGGER log_delete_on_statuses BEFORE DELETE ON `statuses`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`status_id`, 'name', OLD.`name`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'statuses', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- *****************************************************************************************************************************************
-- Subscriptions Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Subscription_Types Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Order_Items Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Orders Table Audit
-- *****************************************************************************************************************************************

-- *****************************************************************************************************************************************
-- Invoice Table Audit
-- *****************************************************************************************************************************************

-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Monthly_Reports Table Audit
-- *****************************************************************************************************************************************
