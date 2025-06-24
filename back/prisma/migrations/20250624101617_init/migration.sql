/*
  Warnings:

  - You are about to drop the column `descript` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Place` DROP COLUMN `descript`,
    DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `Error` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(700) NOT NULL,
    `context` VARCHAR(700) NOT NULL,
    `backCode` VARCHAR(700) NOT NULL,
    `error` VARCHAR(700) NOT NULL,
    `scope` VARCHAR(700) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Place_name_key` ON `Place`(`name`);
