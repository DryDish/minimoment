-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Users
-- ----------------------------------------------------------------------------------------------------------------------------------------


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Admin      : user with almost all permissions on the entire database
-- ----------------------------------------------------------------------------------------------------------------------------------------
DROP USER IF EXISTS `admin`@`%`;
CREATE USER IF NOT EXISTS `admin`@`%`;

ALTER USER `admin`@`%` IDENTIFIED BY '123456';
GRANT
	ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE,
    CREATE TEMPORARY TABLES, CREATE USER, CREATE VIEW, DELETE, 
    DROP, EVENT, EXECUTE, INDEX, 
    INSERT, LOCK TABLES, PROCESS, REFERENCES, 
    RELOAD, REPLICATION CLIENT, REPLICATION SLAVE, SELECT, 
    SHOW DATABASES, SHOW VIEW, TRIGGER, UPDATE 
		ON *.* TO `admin`@`%` WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO `admin`@`%` WITH GRANT OPTION;
        
        
-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Manager    : user with admin permissions limited to the `store` schema
-- ----------------------------------------------------------------------------------------------------------------------------------------
DROP USER IF EXISTS `manager`@`%`;
CREATE USER IF NOT EXISTS `manager`@`%`;

ALTER USER `manager`@`%` IDENTIFIED BY '123456';
GRANT CREATE USER ON *.* TO `manager`@`%`;
GRANT ALL PRIVILEGES ON `store`.* TO `manager`@`%` WITH GRANT OPTION;


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- API        : user with CRUD permissions for the `store` schema
-- ----------------------------------------------------------------------------------------------------------------------------------------
DROP USER IF EXISTS `api`@`%`;
CREATE USER IF NOT EXISTS `api`@`%`;

ALTER USER `api`@`%` IDENTIFIED BY '123456';
GRANT USAGE ON *.* TO `api`@`%`;
GRANT DELETE, EXECUTE, INSERT, SELECT, SHOW VIEW, UPDATE ON `store`.* TO `api`@`%`;


-- ----------------------------------------------------------------------------------------------------------------------------------------
-- Bookkeeper : user with read-only permissions for all data of the `store` schema
-- ----------------------------------------------------------------------------------------------------------------------------------------
DROP USER IF EXISTS `bookkeeper`@`%`;
CREATE USER IF NOT EXISTS `bookkeeper`@`%`;

ALTER USER `bookkeeper`@`%` IDENTIFIED BY '123456';
GRANT USAGE ON *.* TO `bookkeeper`@`%`;
GRANT SELECT, SHOW VIEW ON `store`.* TO `bookkeeper`@`%`;
