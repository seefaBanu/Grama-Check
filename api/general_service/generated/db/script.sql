-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `CertificateRequest`;
DROP TABLE IF EXISTS `Status`;

CREATE TABLE `Status` (
	`id` VARCHAR(191) NOT NULL,
	`submitted` DATETIME NOT NULL,
	`address_verified` DATETIME,
	`approved` DATETIME,
	PRIMARY KEY(`id`)
);

CREATE TABLE `CertificateRequest` (
	`id` VARCHAR(191) NOT NULL,
	`nic` VARCHAR(191) NOT NULL,
	`address` VARCHAR(191) NOT NULL,
	`userEmail` VARCHAR(191) NOT NULL,
	`assignedGramiEmail` VARCHAR(191) NOT NULL,
	`statusId` VARCHAR(191) UNIQUE NOT NULL,
	FOREIGN KEY(`statusId`) REFERENCES `Status`(`id`),
	PRIMARY KEY(`id`)
);
