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
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_contact_info` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_contact_info$$
CREATE TRIGGER log_insert_on_contact_info BEFORE INSERT ON `contact_info`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`contact_info_id`, 'phone_number', NEW.`phone_number`, 'country_code', NEW.`country_code`, 'city', NEW.`city`, 'postal_code', NEW.`postal_code`, 	
								       'address_one', NEW.`address_one`, 'address_two', NEW.`address_two`);  
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'contact_info', 'insert', `old_data`, `new_data`);   
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_contact_info` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_contact_info$$
CREATE TRIGGER log_update_on_contact_info BEFORE UPDATE ON `contact_info`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`contact_info_id`, 'phone_number', OLD.`phone_number`, 'country_code', OLD.`country_code`, 'city', OLD.`city`, 'postal_code', OLD.`postal_code`, 	
								   'address_one', OLD.`address_one`, 'address_two', OLD.`address_two`);
		SET new_data = JSON_OBJECT('id', NEW.`contact_info_id`, 'phone_number', NEW.`phone_number`, 'country_code', NEW.`country_code`, 'city', NEW.`city`, 'postal_code', NEW.`postal_code`, 	
								   'address_one', NEW.`address_one`, 'address_two', NEW.`address_two`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'contact_info', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_contact_info` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_contact_info$$
CREATE TRIGGER log_delete_on_contact_info BEFORE DELETE ON `contact_info`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`contact_info_id`, 'phone_number', OLD.`phone_number`, 'country_code', OLD.`country_code`, 'city', OLD.`city`, 'postal_code', OLD.`postal_code`, 	
								   'address_one', OLD.`address_one`, 'address_two', OLD.`address_two`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'contact_info', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Discount_Codes Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_discount_codes` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_discount_codes$$
CREATE TRIGGER log_insert_on_discount_codes BEFORE INSERT ON `discount_codes`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`discount_code_id`, 'name', NEW.`name`, 'discount_type_id', NEW.`discount_type_id`, 'value', NEW.`value`, 'valid_from', NEW.`valid_from`, 	
								       'valid_to', NEW.`valid_to`, 'remaining_uses', NEW.`remaining_uses`);  
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'discount_codes', 'insert', `old_data`, `new_data`);   
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_discount_codes` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_discount_codes$$
CREATE TRIGGER log_update_on_discount_codes BEFORE UPDATE ON `discount_codes`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`discount_code_id`, 'name', OLD.`name`, 'discount_type_id', OLD.`discount_type_id`, 'value', OLD.`value`, 'valid_from', OLD.`valid_from`, 	
								   'valid_to', OLD.`valid_to`, 'remaining_uses', OLD.`remaining_uses`);
		SET new_data = JSON_OBJECT('id', NEW.`discount_code_id`, 'name', NEW.`name`, 'discount_type_id', NEW.`discount_type_id`, 'value', NEW.`value`, 'valid_from', NEW.`valid_from`, 	
								   'valid_to', NEW.`valid_to`, 'remaining_uses', NEW.`remaining_uses`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'discount_codes', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_discount_codes` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_discount_codes$$
CREATE TRIGGER log_delete_on_discount_codes BEFORE DELETE ON `discount_codes`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`discount_code_id`, 'name', OLD.`name`, 'discount_type_id', OLD.`discount_type_id`, 'value', OLD.`value`, 'valid_from', OLD.`valid_from`, 	
								   'valid_to', OLD.`valid_to`, 'remaining_uses', OLD.`remaining_uses`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'discount_codes', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Discount_Types Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_discount_types` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_discount_types$$
CREATE TRIGGER log_insert_on_discount_types BEFORE INSERT ON `discount_types`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`discount_type_id`, 'name', NEW.`name`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'discount_types', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_discount_types` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_discount_types$$
CREATE TRIGGER log_update_on_discount_types BEFORE UPDATE ON `discount_types`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`discount_type_id`, 'name', OLD.`name`);
		SET new_data = JSON_OBJECT('id', NEW.`discount_type_id`, 'name', NEW.`name`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'discount_types', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_discount_types` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_discount_types$$
CREATE TRIGGER log_delete_on_discount_types BEFORE DELETE ON `discount_types`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`discount_type_id`, 'name', OLD.`name`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'discount_types', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Users Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_users` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_users$$
CREATE TRIGGER log_insert_on_users BEFORE INSERT ON `users`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`user_id`, 'first_name', NEW.`first_name`, 'last_name', NEW.`last_name`, 'username', NEW.`username`, 'password', NEW.`password`, 	
									   'contact_info_id', NEW.`contact_info_id`, 'role_id', NEW.`role_id`, 'auto_renew', NEW.`auto_renew`);  
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'users', 'insert', `old_data`, `new_data`);   
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_users` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_users$$
CREATE TRIGGER log_update_on_users BEFORE UPDATE ON `users`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`user_id`, 'first_name', OLD.`first_name`, 'last_name', OLD.`last_name`, 'username', OLD.`username`, 'password', OLD.`password`, 	
								   'contact_info_id', OLD.`contact_info_id`, 'role_id', OLD.`role_id`, 'auto_renew', OLD.`auto_renew`);
		SET new_data = JSON_OBJECT('id', NEW.`user_id`, 'first_name', NEW.`first_name`, 'last_name', NEW.`last_name`, 'username', NEW.`username`, 'password', NEW.`password`, 	
								   'contact_info_id', NEW.`contact_info_id`, 'role_id', NEW.`role_id`, 'auto_renew', NEW.`auto_renew`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'users', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_users` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_users$$
CREATE TRIGGER log_delete_on_users BEFORE DELETE ON `users`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`user_id`, 'first_name', OLD.`first_name`, 'last_name', OLD.`last_name`, 'username', OLD.`username`, 'password', OLD.`password`, 	
								   'contact_info_id', OLD.`contact_info_id`, 'role_id', OLD.`role_id`, 'auto_renew', OLD.`auto_renew`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'users', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





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
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_frames` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_frames$$
CREATE TRIGGER log_insert_on_frames BEFORE INSERT ON `frames`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`frame_id`, 'discount_code_id', NEW.`discount_code_id`, 'name', NEW.`name`, 'multiplier', NEW.`multiplier`, 'material', NEW.`material`, 'size_id', NEW.`size_id`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'frames', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_frames` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_frames$$
CREATE TRIGGER log_update_on_frames BEFORE UPDATE ON `frames`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`frame_id`, 'discount_code_id', OLD.`discount_code_id`, 'name', OLD.`name`, 'multiplier', OLD.`multiplier`, 'material', OLD.`material`, 'size_id', OLD.`size_id`);
		SET new_data = JSON_OBJECT('id', NEW.`frame_id`, 'discount_code_id', NEW.`discount_code_id`, 'name', NEW.`name`, 'multiplier', NEW.`multiplier`, 'material', NEW.`material`, 'size_id', NEW.`size_id`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'frames', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_frames` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_frames$$
CREATE TRIGGER log_delete_on_frames BEFORE DELETE ON `frames`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`frame_id`, 'discount_code_id', OLD.`discount_code_id`, 'name', OLD.`name`, 'multiplier', OLD.`multiplier`, 'material', OLD.`material`, 'size_id', OLD.`size_id`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'frames', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Paper_Types Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_paper_types` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_paper_types$$
CREATE TRIGGER log_insert_on_paper_types BEFORE INSERT ON `paper_types`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`paper_type_id`, 'name', NEW.`name`, 'multiplier', NEW.`multiplier`, 'size_id', NEW.`size_id`, 'discount_code_id', NEW.`discount_code_id`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'paper_types', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_paper_types` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_paper_types$$
CREATE TRIGGER log_update_on_paper_types BEFORE UPDATE ON `paper_types`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`paper_type_id`, 'name', OLD.`name`, 'multiplier', OLD.`multiplier`, 'size_id', OLD.`size_id`, 'discount_code_id', OLD.`discount_code_id`);
		SET new_data = JSON_OBJECT('id', NEW.`paper_type_id`, 'name', NEW.`name`, 'multiplier', NEW.`multiplier`, 'size_id', NEW.`size_id`, 'discount_code_id', NEW.`discount_code_id`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'paper_types', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_paper_types` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_paper_types$$
CREATE TRIGGER log_delete_on_paper_types BEFORE DELETE ON `paper_types`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`paper_type_id`, 'name', OLD.`name`, 'multiplier', OLD.`multiplier`, 'size_id', OLD.`size_id`, 'discount_code_id', OLD.`discount_code_id`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'paper_types', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Picture_Data Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_picture_data` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_picture_data$$
CREATE TRIGGER log_insert_on_picture_data BEFORE INSERT ON `picture_data`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`picture_data_id`, 'user_id', NEW.`user_id`, 'image_url', NEW.`image_url`, 'uploaded_at', NEW.`uploaded_at`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'picture_data', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_picture_data` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_picture_data$$
CREATE TRIGGER log_update_on_picture_data BEFORE UPDATE ON `picture_data`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`picture_data_id`, 'user_id', OLD.`user_id`, 'image_url', OLD.`image_url`, 'uploaded_at', OLD.`uploaded_at`);
		SET new_data = JSON_OBJECT('id', NEW.`picture_data_id`, 'user_id', NEW.`user_id`, 'image_url', NEW.`image_url`, 'uploaded_at', NEW.`uploaded_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'picture_data', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_picture_data` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_picture_data$$
CREATE TRIGGER log_delete_on_picture_data BEFORE DELETE ON `picture_data`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`picture_data_id`, 'user_id', OLD.`user_id`, 'image_url', OLD.`image_url`, 'uploaded_at', OLD.`uploaded_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'picture_data', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;




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
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_subscriptions` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_subscriptions$$
CREATE TRIGGER log_insert_on_subscriptions BEFORE INSERT ON `subscriptions`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`subscription_id`, 'user_id', NEW.`user_id`, 'subscription_type_id', NEW.`subscription_type_id`, 'starts_at', NEW.`starts_at`, 'ends_at', NEW.`ends_at`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'subscriptions', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_subscriptions` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_subscriptions$$
CREATE TRIGGER log_update_on_subscriptions BEFORE UPDATE ON `subscriptions`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`subscription_id`, 'user_id', OLD.`user_id`, 'subscription_type_id', OLD.`subscription_type_id`, 'starts_at', OLD.`starts_at`, 'ends_at', OLD.`ends_at`);
		SET new_data = JSON_OBJECT('id', NEW.`subscription_id`, 'user_id', NEW.`user_id`, 'subscription_type_id', NEW.`subscription_type_id`, 'starts_at', NEW.`starts_at`, 'ends_at', NEW.`ends_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'subscriptions', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_subscriptions` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_subscriptions$$
CREATE TRIGGER log_delete_on_subscriptions BEFORE DELETE ON `subscriptions`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`subscription_id`, 'user_id', OLD.`user_id`, 'subscription_type_id', OLD.`subscription_type_id`, 'starts_at', OLD.`starts_at`, 'ends_at', OLD.`ends_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'subscriptions', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Subscription_Types Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_subscription_types` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_subscription_types$$
CREATE TRIGGER log_insert_on_subscription_types BEFORE INSERT ON `subscription_types`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`subscription_type_id`, 'name', NEW.`name`, 'monthly_price', NEW.`monthly_price`, 'image_amount', NEW.`image_amount`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'subscription_types', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_subscription_types` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_subscription_types$$
CREATE TRIGGER log_update_on_subscription_types BEFORE UPDATE ON `subscription_types`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`subscription_type_id`, 'name', OLD.`name`, 'monthly_price', OLD.`monthly_price`, 'image_amount', OLD.`image_amount`);
		SET new_data = JSON_OBJECT('id', NEW.`subscription_type_id`, 'name', NEW.`name`, 'monthly_price', NEW.`monthly_price`, 'image_amount', NEW.`image_amount`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'subscription_types', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_subscription_types` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_subscription_types$$
CREATE TRIGGER log_delete_on_subscription_types BEFORE DELETE ON `subscription_types`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`subscription_type_id`, 'name', OLD.`name`, 'monthly_price', OLD.`monthly_price`, 'image_amount', OLD.`image_amount`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'subscription_types', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Order_Items Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_order_items` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_order_items$$
CREATE TRIGGER log_insert_on_order_items BEFORE INSERT ON `order_items`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`order_item_id`, 'picture_data_id', NEW.`picture_data_id`, 'paper_type_id', NEW.`paper_type_id`, 'frame_id', NEW.`frame_id`, 'order_id', NEW.`order_id`, 	
								       'order_item_price', NEW.`order_item_price`, 'price_saved', NEW.`price_saved`, 'amount', NEW.`amount`);   
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'order_items', 'insert', `old_data`, `new_data`);   
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_order_items` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_order_items$$
CREATE TRIGGER log_update_on_order_items BEFORE UPDATE ON `order_items`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`order_item_id`, 'picture_data_id', OLD.`picture_data_id`, 'paper_type_id', OLD.`paper_type_id`, 'frame_id', OLD.`frame_id`, 'order_id', OLD.`order_id`, 	
								   'order_item_price', OLD.`order_item_price`, 'price_saved', OLD.`price_saved`, 'amount', OLD.`amount`);
		SET new_data = JSON_OBJECT('id', NEW.`order_item_id`, 'picture_data_id', NEW.`picture_data_id`, 'paper_type_id', NEW.`paper_type_id`, 'frame_id', NEW.`frame_id`, 'order_id', NEW.`order_id`, 	
								   'order_item_price', NEW.`order_item_price`, 'price_saved', NEW.`price_saved`, 'amount', NEW.`amount`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'order_items', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_order_items` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_order_items$$
CREATE TRIGGER log_delete_on_order_items BEFORE DELETE ON `order_items`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`order_item_id`, 'picture_data_id', OLD.`picture_data_id`, 'paper_type_id', OLD.`paper_type_id`, 'frame_id', OLD.`frame_id`, 'order_id', OLD.`order_id`, 	
								   'order_item_price', OLD.`order_item_price`, 'price_saved', OLD.`price_saved`, 'amount', OLD.`amount`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'order_items', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Orders Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_orders` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_orders$$
CREATE TRIGGER log_insert_on_orders BEFORE INSERT ON `orders`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`order_id`, 'discount_code_id', NEW.`discount_code_id`, 'user_id', NEW.`user_id`, 'billing_contact_info_id', NEW.`billing_contact_info_id`, 'status_id', NEW.`status_id`, 	
								       'order_price', NEW.`order_price`, 'total_price_saved', NEW.`total_price_saved`, 'created_at', NEW.`created_at`);   
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'orders', 'insert', `old_data`, `new_data`);   
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_orders` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_orders$$
CREATE TRIGGER log_update_on_orders BEFORE UPDATE ON `orders`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`order_id`, 'discount_code_id', OLD.`discount_code_id`, 'user_id', OLD.`user_id`, 'billing_contact_info_id', OLD.`billing_contact_info_id`, 'status_id', OLD.`status_id`, 	
								   'order_price', OLD.`order_price`, 'total_price_saved', OLD.`total_price_saved`, 'created_at', OLD.`created_at`);
		SET new_data = JSON_OBJECT('id', NEW.`order_id`, 'discount_code_id', NEW.`discount_code_id`, 'user_id', NEW.`user_id`, 'billing_contact_info_id', NEW.`billing_contact_info_id`, 'status_id', NEW.`status_id`, 	
								   'order_price', NEW.`order_price`, 'total_price_saved', NEW.`total_price_saved`, 'created_at', NEW.`created_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'orders', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_orders` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_orders$$
CREATE TRIGGER log_delete_on_orders BEFORE DELETE ON `orders`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`order_id`, 'discount_code_id', OLD.`discount_code_id`, 'user_id', OLD.`user_id`, 'billing_contact_info_id', OLD.`billing_contact_info_id`, 'status_id', OLD.`status_id`, 	
								   'order_price', OLD.`order_price`, 'total_price_saved', OLD.`total_price_saved`, 'created_at', OLD.`created_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'orders', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Invoice Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_invoice` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_invoice$$
CREATE TRIGGER log_insert_on_invoice BEFORE INSERT ON `invoice`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`invoice_id`, 'order_id', NEW.`order_id`, 'created_at', NEW.`created_at`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'invoice', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_invoice` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_invoice$$
CREATE TRIGGER log_update_on_invoice BEFORE UPDATE ON `invoice`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`invoice_id`, 'order_id', OLD.`order_id`, 'created_at', OLD.`created_at`);
		SET new_data = JSON_OBJECT('id', NEW.`invoice_id`, 'order_id', NEW.`order_id`, 'created_at', NEW.`created_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'invoice', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_invoice` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_invoice$$
CREATE TRIGGER log_delete_on_invoice BEFORE DELETE ON `invoice`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`invoice_id`, 'order_id', OLD.`order_id`, 'created_at', OLD.`created_at`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'invoice', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;





-- *****************************************************************************************************************************************
-- Monthly_Reports Table Audit
-- *****************************************************************************************************************************************
-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_insert_on_monthly_reports` -> Writes to the `audit_logs` table with `log_change()` when a new entry is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_insert_on_monthly_reports$$
CREATE TRIGGER log_insert_on_monthly_reports BEFORE INSERT ON `monthly_reports`
	FOR EACH ROW
		BEGIN
			-- Define data
			DECLARE new_data JSON;
            DECLARE old_data JSON;
            -- Store data
			SET new_data = JSON_OBJECT('id', NEW.`monthly_report_id`, 'created_at', NEW.`created_at`, 'frames_sold', NEW.`frames_sold`, 'pictures_sold', NEW.`pictures_sold`, 'total_products_sold', NEW.`total_products_sold`, 'revenue', NEW.`revenue`);
			-- Call procedure
			CALL insert_log(CURRENT_USER(), 'monthly_reports', 'insert', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_update_on_monthly_reports` -> Writes to the `audit_logs` table with `log_change()` when an update is made.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_update_on_monthly_reports$$
CREATE TRIGGER log_update_on_monthly_reports BEFORE UPDATE ON `monthly_reports`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
        SET old_data = JSON_OBJECT('id', OLD.`monthly_report_id`, 'created_at', OLD.`created_at`, 'frames_sold', OLD.`frames_sold`, 'pictures_sold', OLD.`pictures_sold`, 'total_products_sold', OLD.`total_products_sold`, 'revenue', OLD.`revenue`);
		SET new_data = JSON_OBJECT('id', NEW.`monthly_report_id`, 'created_at', NEW.`created_at`, 'frames_sold', NEW.`frames_sold`, 'pictures_sold', NEW.`pictures_sold`, 'total_products_sold', NEW.`total_products_sold`, 'revenue', NEW.`revenue`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'monthly_reports', 'update', `old_data`, `new_data`);           
	END; $$
DELIMITER ;


-- -----------------------------------------------------------------------------------------------------------------------------------------
-- Trigger `log_delete_on_monthly_reports` -> Writes to the `audit_logs` table with `log_change()` when an entry is deleted.
-- -----------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
DROP TRIGGER IF EXISTS log_delete_on_monthly_reports$$
CREATE TRIGGER log_delete_on_monthly_reports BEFORE DELETE ON `monthly_reports`FOR EACH ROW
	BEGIN
		-- Define data
		DECLARE old_data JSON;
		DECLARE new_data JSON;
		-- Store data
		SET old_data = JSON_OBJECT('id', OLD.`monthly_report_id`, 'created_at', OLD.`created_at`, 'frames_sold', OLD.`frames_sold`, 'pictures_sold', OLD.`pictures_sold`, 'total_products_sold', OLD.`total_products_sold`, 'revenue', OLD.`revenue`);
		-- Call procedure
		CALL insert_log(CURRENT_USER(), 'monthly_reports', 'delete', `old_data`, `new_data`);           
	END; $$
DELIMITER ;