-- --------------------------------------------------------------------
-- Events
-- --------------------------------------------------------------------
USE `store`;


-- --------------------------------------------------------------------
-- Table `monthly_report`
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `monthly_reports` ;

CREATE TABLE IF NOT EXISTS `monthly_reports` (
  `monthly_report_id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `frames_sold` INT,
  `pictures_sold` INT,
  `total_products_sold` INT,
  `revenue` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`monthly_report_id`))
ENGINE = InnoDB;


-- --------------------------------------------------------------------
-- create_monthly_report
-- --------------------------------------------------------------------
DROP EVENT IF EXISTS create_monthly_report;

DELIMITER $$
CREATE EVENT create_monthly_report_test
	ON SCHEDULE 
		EVERY 1 MONTH
	COMMENT 'Creates a new report every month.'
	DO 
		BEGIN
			-- Revenue
			CALL get_revenue(NOW() - INTERVAL 1 MONTH, NOW(), @revenue);
            -- Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, true, @products);
			-- No Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, true, @frames);
			-- Pictures & No Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, false, @sold);
			INSERT INTO `monthly_reports` (`revenue`, `total_products_sold`, `frames_sold`, `pictures_sold`) VALUES (
				@revenue, @products,  @frames, @sold
            );
		END $$
DELIMITER ;


-- ------------------------------------------------------------------------------------------------
-- create_monthly_report - TEST ( runs at 5 second interval for testing purposes )
-- ------------------------------------------------------------------------------------------------
DROP EVENT IF EXISTS create_monthly_report_test;

DELIMITER $$
CREATE EVENT create_monthly_report_test
	ON SCHEDULE 
		EVERY 5 SECOND
	COMMENT 'Creates a new report every 5 seconds.'
	DO 
		BEGIN
			-- Revnue
			CALL get_revenue(NOW() - INTERVAL 1 MONTH, NOW(), @revenue);
            -- Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, true, @products);
			-- No Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, true, @frames);
			-- Pictures & No Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, false, @sold);
			INSERT INTO `monthly_reports` (`revenue`, `total_products_sold`, `frames_sold`, `pictures_sold`) VALUES (
				@revenue, @products,  @frames, @sold
            );
		END $$
DELIMITER ;

SELECT * FROM `monthly_reports`;
