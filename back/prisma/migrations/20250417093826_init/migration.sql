/*
  Warnings:

  - You are about to alter the column `date` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `reason` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reason` TEXT NOT NULL;
