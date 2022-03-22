-- ------------------------------------------------------------------------------------------------
-- Events
-- ------------------------------------------------------------------------------------------------
USE `store`;


-- ------------------------------------------------------------------------------------------------
-- Table `monthly_reports`
-- ------------------------------------------------------------------------------------------------
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


-- ------------------------------------------------------------------------------------------------
-- Event `create_monthly_report`
-- ------------------------------------------------------------------------------------------------
DROP EVENT IF EXISTS create_monthly_report;

DELIMITER $$
CREATE EVENT create_monthly_report
	ON SCHEDULE 
		EVERY 1 MONTH
	COMMENT 'Creates a new report every month.'
	DO 
		BEGIN
			-- Revenue
			CALL get_revenue(NOW() - INTERVAL 1 MONTH, NOW(), @monthly_revenue);
            -- Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, true, @products_sold);
			-- No Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, true, @frames_sold);
			-- Pictures & No Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, false, @pictures_sold);
			INSERT INTO `monthly_reports` (`revenue`, `total_products_sold`, `frames_sold`, `pictures_sold`) VALUES (
				@monthly_revenue, @products_sold, @frames_sold, @pictures_sold
            );
		END $$
DELIMITER ;


-- ------------------------------------------------------------------------------------------------
-- Event `create_monthly_report_test` 
--            <--TEST--> 
-- (runs at a 5 second interval, for testing purposes)
-- ------------------------------------------------------------------------------------------------
DROP EVENT IF EXISTS create_monthly_report_test;

DELIMITER $$
CREATE EVENT create_monthly_report_test
	ON SCHEDULE 
		EVERY 5 SECOND
	COMMENT 'Creates a new report every five seconds.'
	DO 
		BEGIN
			-- Revenue
			CALL get_revenue(NOW() - INTERVAL 1 MONTH, NOW(), @test_monthly_revenue);
            -- Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, true, @test_products_sold);
			-- No Pictures & Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), false, true, @test_frames_sold);
			-- Pictures & No Frames
			CALL get_products_sold(NOW() - INTERVAL 1 MONTH, NOW(), true, false, @test_pictures_sold);
			INSERT INTO `monthly_reports` (`revenue`, `total_products_sold`, `frames_sold`, `pictures_sold`) VALUES (
				@test_monthly_revenue, @test_products_sold,  @test_frames_sold, @test_pictures_sold
            );
		END $$
DELIMITER ;

SELECT * FROM `monthly_reports`; -- Check out monthly reports.
