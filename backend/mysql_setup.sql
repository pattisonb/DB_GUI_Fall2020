-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PonyListBackend
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema PonyListBackend
-- -----------------------------------------------------
CREATE DATABASE PonyListBackend; 

USE PonyListBackend;

-- -----------------------------------------------------
-- Table `PonyListBackend`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
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


INSERT INTO Users (Username, Password, OnCampus, Dorm, NumSales, IsStudent, Location, Rating, MilesAway) values ('admin', 'password', 'YES', 'Ware', 0, 'Yes', 'Campus', 0.0, 0);


-- -----------------------------------------------------
-- Table `PonyListBackend`.`Items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Items` (
  `ItemID` INT NOT NULL AUTO_INCREMENT,
  `SellerID` INT NOT NULL,
  `ItemName` VARCHAR(45) NULL,
  `ItemCost` DECIMAL(10,2) NULL,
  `ItemDetails` VARCHAR(45) NULL,
  `IsSold` VARCHAR(45) NULL,
  PRIMARY KEY (`ItemID`),
  INDEX `UserID_idx` (`SellerID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PonyListBackend`.`Messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Messages` (
  `MessageID` INT NOT NULL AUTO_INCREMENT,
  `RecipientID` INT NOT NULL,
  `SenderID` INT NOT NULL,
  `MessageText` VARCHAR(255) NULL,
  PRIMARY KEY (`MessageID`),
  INDEX `SenderID_idx` (`SenderID` ASC) VISIBLE,
  INDEX `RecipientID_idx` (`RecipientID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PonyListBackend`.`Reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Reviews` (
  `ReviewID` INT NOT NULL AUTO_INCREMENT,
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
-- Table `PonyListBackend`.`AvailableTimes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`AvailableTimes` (
  `UserID` INT NULL,
  `Day` VARCHAR(45) NULL,
  `Time` DATETIME NULL,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PonyListBackend`.`Ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Ratings` (
  `RatingID` INT NOT NULL AUTO_INCREMENT,
  `BuyerID` INT NULL,
  `SellerID` INT NULL,
  `Rating` DECIMAL(3,1) NULL,
  PRIMARY KEY (`RatingID`),
  INDEX `UserID_idx` (`BuyerID` ASC) VISIBLE,
  INDEX `UserID_idx1` (`SellerID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PonyListBackend`.`Favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Favorites` (
  `UserID` INT NULL,
  `ItemID` INT NULL,
  INDEX `ItemID_idx` (`ItemID` ASC) VISIBLE,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PonyListBackend`.`SharedProducts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`SharedProducts` (
  `UserID` INT NULL,
  `ItemID` INT NULL,
  INDEX `ItemID_idx` (`ItemID` ASC) VISIBLE,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PonyListBackend`.`Transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PonyListBackend`.`Transactions` (
  `TransactionID` INT NOT NULL AUTO_INCREMENT,
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
