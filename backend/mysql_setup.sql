-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `UserID` INT NOT NULL,
  `UserType` VARCHAR(45) NOT NULL,
  `Username` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `OnCampus` VARCHAR(45) NULL,
  `Dorm` VARCHAR(45) NULL,
  `NumSales` INT NULL,
  `IsStudent` VARCHAR(45) NULL,
  `Location` VARCHAR(45) NULL,
  `Rating` DECIMAL(3,1) NULL,
  `MilesAway` INT NULL,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Items` (
  `ItemID` INT NOT NULL,
  `SellerID` INT NOT NULL,
  `ItemName` VARCHAR(45) NULL,
  `ItemCost` DECIMAL(10,2) NULL,
  `ItemDetails` VARCHAR(45) NULL,
  `IsSold` VARCHAR(45) NULL,
  PRIMARY KEY (`ItemID`),
  INDEX `UserID_idx` (`SellerID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Messages` (
  `MessageID` INT NOT NULL,
  `RecipientID` INT NOT NULL,
  `SenderID` INT NOT NULL,
  `MessageText` VARCHAR(255) NULL,
  PRIMARY KEY (`MessageID`),
  INDEX `SenderID_idx` (`SenderID` ASC) VISIBLE,
  INDEX `RecipientID_idx` (`RecipientID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Reviews` (
  `ReviewID` INT NOT NULL,
  `SellerID` INT NOT NULL,
  `ItemID` INT NOT NULL,
  `BuyerID` INT NOT NULL,
  `ReviewText` VARCHAR(45) NULL,
  `Rating` DECIMAL(2,1) NULL,
  PRIMARY KEY (`ReviewID`),
  INDEX `UserID_idx` (`SellerID` ASC) VISIBLE,
  INDEX `UserID_idx1` (`BuyerID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`AvailableTimes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`AvailableTimes` (
  `UserID` INT NULL,
  `Day` VARCHAR(45) NULL,
  `Time` DATETIME NULL,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ratings` (
  `RatingID` INT NOT NULL,
  `BuyerID` INT NULL,
  `SellerID` INT NULL,
  `Rating` DECIMAL(3,1) NULL,
  PRIMARY KEY (`RatingID`),
  INDEX `UserID_idx` (`BuyerID` ASC) VISIBLE,
  INDEX `UserID_idx1` (`SellerID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Favorites` (
  `UserID` INT NULL,
  `ItemID` INT NULL,
  INDEX `ItemID_idx` (`ItemID` ASC) VISIBLE,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SharedProducts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SharedProducts` (
  `UserID` INT NULL,
  `ItemID` INT NULL,
  INDEX `ItemID_idx` (`ItemID` ASC) VISIBLE,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Transactions` (
  `TransactionID` INT NOT NULL,
  `BuyerID` INT NOT NULL,
  `SellerID` INT NOT NULL,
  `ItemID` INT NOT NULL,
  `SellPrice` DECIMAL(10,2) NULL,
  PRIMARY KEY (`TransactionID`),
  INDEX `UserID_idx` (`BuyerID` ASC) VISIBLE,
  INDEX `UserID_idx1` (`SellerID` ASC) VISIBLE,
  INDEX `ItemID_idx` (`ItemID` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
