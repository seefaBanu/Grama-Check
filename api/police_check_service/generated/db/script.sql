-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `PoliceCase`;
DROP TABLE IF EXISTS `Citizen`;

CREATE TABLE `Citizen` (
	`nic` VARCHAR(191) NOT NULL,
	PRIMARY KEY(`nic`)
);

CREATE TABLE `PoliceCase` (
	`caseId` INT NOT NULL,
	`issue` VARCHAR(191) NOT NULL,
	`date` DATE NOT NULL,
	`citizenNic` VARCHAR(191) NOT NULL,
	FOREIGN KEY(`citizenNic`) REFERENCES `Citizen`(`nic`),
	PRIMARY KEY(`caseId`)
);
