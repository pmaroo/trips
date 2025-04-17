/*
  Warnings:

  - You are about to alter the column `date` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `reason` TEXT NULL;
