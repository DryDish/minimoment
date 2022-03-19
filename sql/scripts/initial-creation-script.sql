-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema store
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `store` ;

-- -----------------------------------------------------
-- Schema store
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `store` ;

-- -----------------------------------------------------
-- Table `contact_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `contact_info` ;

CREATE TABLE IF NOT EXISTS `contact_info` (
  `contact_info_id` INT NOT NULL AUTO_INCREMENT,
  `phone_number` VARCHAR(20) NOT NULL,
  `country_code` VARCHAR(3) NOT NULL,
  `city` VARCHAR(97) NOT NULL,
  `postal_code` VARCHAR(8) NOT NULL,
  `address_one` VARCHAR(255) NOT NULL,
  `address_two` VARCHAR(255) NULL,
  PRIMARY KEY (`contact_info_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roles` ;

CREATE TABLE IF NOT EXISTS `roles` (
  `roles_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`roles_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `roles` (`name` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(60) NULL,
  `last_name` VARCHAR(60) NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `contact_info_id` INT NULL,
  `roles_id` INT NOT NULL,
  `auto_renew` TINYINT(1) NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_contact_info`
    FOREIGN KEY (`contact_info_id`)
    REFERENCES `contact_info` (`contact_info_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`roles_id`)
    REFERENCES `roles` (`roles_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_user_contact_info_idx` ON `users` (`contact_info_id` ASC) VISIBLE;

CREATE INDEX `fk_users_roles_idx` ON `users` (`roles_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `username_UNIQUE` ON `users` (`username` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `subscription_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `subscription_types` ;

CREATE TABLE IF NOT EXISTS `subscription_types` (
  `subscription_type_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `monthly_price` DECIMAL(15, 2) NOT NULL,
  `image_amount` INT NOT NULL,
  PRIMARY KEY (`subscription_type_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `subscription_types` (`name` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `discount_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `discount_types` ;

CREATE TABLE IF NOT EXISTS `discount_types` (
  `discount_type_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`discount_type_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `discount_types` (`name` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `discount_codes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `discount_codes` ;

CREATE TABLE IF NOT EXISTS `discount_codes` (
  `discount_code_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `discount_type_id` INT NOT NULL,
  `value` DECIMAL(15, 2) NOT NULL,
  `valid_from` DATETIME NOT NULL,
  `valid_to` DATETIME NOT NULL,
  `remaining_uses` INT NOT NULL,
  PRIMARY KEY (`discount_code_id`),
  CONSTRAINT `fk_discount_codes_discount_type`
    FOREIGN KEY (`discount_type_id`)
    REFERENCES `discount_types` (`discount_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_discount_codes_discount_type_idx` ON `discount_codes` (`discount_type_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `name_UNIQUE` ON `discount_codes` (`name` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `statuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `statuses` ;

CREATE TABLE IF NOT EXISTS `statuses` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `statuses` (`name` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orders` ;

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `discount_code_id` INT,
  `user_id` INT NOT NULL,
  `billing_contact_info_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `order_price` DECIMAL(15, 2) NOT NULL DEFAULT 0,
  `total_price_saved` DECIMAL(15, 2) NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_order_discount_codes`
    FOREIGN KEY (`discount_code_id`)
    REFERENCES `discount_codes` (`discount_code_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_contact_info`
    FOREIGN KEY (`billing_contact_info_id`)
    REFERENCES `contact_info` (`contact_info_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_statuses`
    FOREIGN KEY (`status_id`)
    REFERENCES `statuses` (`status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_order_discount_codes_idx` ON `orders` (`discount_code_id` ASC) VISIBLE;

CREATE INDEX `fk_orders_users_idx` ON `orders` (`user_id` ASC) VISIBLE;

CREATE INDEX `fk_orders_contact_info_idx` ON `orders` (`billing_contact_info_id` ASC) VISIBLE;

CREATE INDEX `fk_orders_statuses_idx` ON `orders` (`status_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `invoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `invoice` ;

CREATE TABLE IF NOT EXISTS `invoice` (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`invoice_id`),
  CONSTRAINT `fk_invoice_orders`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_invoice_orders_idx` ON `invoice` (`order_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `picture_data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `picture_data` ;

CREATE TABLE IF NOT EXISTS `picture_data` (
  `picture_data_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `uploaded_at` DATETIME NOT NULL,
  PRIMARY KEY (`picture_data_id`),
  CONSTRAINT `fk_picture_data_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_picture_data_users_idx` ON `picture_data` (`user_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sizes` ;

CREATE TABLE IF NOT EXISTS `sizes` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `width_mm` INT NOT NULL,
  `height_mm` INT NOT NULL,
  `price` DECIMAL(15, 2) NOT NULL,
  PRIMARY KEY (`size_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `frames`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `frames` ;

CREATE TABLE IF NOT EXISTS `frames` (
  `frame_id` INT NOT NULL AUTO_INCREMENT,
  `discount_code_id` INT,
  `name` VARCHAR(45) NOT NULL,
  `multiplier` DECIMAL(3,2) NOT NULL,
  `material` VARCHAR(45) NULL,
  `size_id` INT NOT NULL,
  PRIMARY KEY (`frame_id`),
  CONSTRAINT `fk_frame_discount_codes`
    FOREIGN KEY (`discount_code_id`)
    REFERENCES `discount_codes` (`discount_code_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_frames_sizes`
    FOREIGN KEY (`size_id`)
    REFERENCES `sizes` (`size_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_frame_discount_codes_idx` ON `frames` (`discount_code_id` ASC) VISIBLE;

CREATE INDEX `fk_frames_sizes_idx` ON `frames` (`size_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `paper_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `paper_types` ;

CREATE TABLE IF NOT EXISTS `paper_types` (
  `paper_type_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `multiplier` DECIMAL(3,2) NOT NULL,
  `size_id` INT NOT NULL,
  `discount_code_id` INT,
  PRIMARY KEY (`paper_type_id`, `multiplier`),
  CONSTRAINT `fk_paper_types_sizes`
    FOREIGN KEY (`size_id`)
    REFERENCES `sizes` (`size_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_paper_types_discount_codes`
    FOREIGN KEY (`discount_code_id`)
    REFERENCES `discount_codes` (`discount_code_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_paper_types_sizes_idx` ON `paper_types` (`size_id` ASC) VISIBLE;

CREATE INDEX `fk_paper_types_discount_codes_idx` ON `paper_types` (`discount_code_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `order_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `order_items` ;

CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` INT NOT NULL AUTO_INCREMENT,
  `picture_data_id` INT NULL,
  `paper_type_id` INT NULL,
  `frame_id` INT NULL,
  `order_id` INT NOT NULL,
  `order_item_price` DECIMAL(15, 2) NOT NULL,
  `price_saved` DECIMAL(15, 2) NULL,
  `amount` INT NOT NULL,
  PRIMARY KEY (`order_item_id`),
  CONSTRAINT `fk_order_item_picture_data`
    FOREIGN KEY (`picture_data_id`)
    REFERENCES `picture_data` (`picture_data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_paper_type`
    FOREIGN KEY (`paper_type_id`)
    REFERENCES `paper_types` (`paper_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_frame`
    FOREIGN KEY (`frame_id`)
    REFERENCES `frames` (`frame_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_order_item_picture_data_idx` ON `order_items` (`picture_data_id` ASC) VISIBLE;

CREATE INDEX `fk_order_item_paper_type_idx` ON `order_items` (`paper_type_id` ASC) VISIBLE;

CREATE INDEX `fk_order_item_frame_idx` ON `order_items` (`frame_id` ASC) VISIBLE;

CREATE INDEX `fk_order_item_order_idx` ON `order_items` (`order_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `subscriptions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `subscriptions` ;

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `subscription_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `subscription_type_id` INT NOT NULL,
  `starts_at` DATETIME NOT NULL,
  `ends_at` DATETIME NOT NULL,
  PRIMARY KEY (`subscription_id`),
  CONSTRAINT `fk_subscription_subscription_type`
    FOREIGN KEY (`subscription_type_id`)
    REFERENCES `subscription_types` (`subscription_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subscription_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_subscription_subscription_type_idx` ON `subscriptions` (`subscription_type_id` ASC) VISIBLE;

CREATE INDEX `fk_subscription_users_idx` ON `subscriptions` (`user_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
