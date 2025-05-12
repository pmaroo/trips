/*
  Warnings:

  - You are about to alter the column `date` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tag` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(700)` to `VarChar(191)`.
  - A unique constraint covering the columns `[tag]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Tag` MODIFY `tag` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_tag_key` ON `Tag`(`tag`);
