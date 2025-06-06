/*
  Warnings:

  - You are about to drop the column `region` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `category` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `days` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originDate` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `region`,
    DROP COLUMN `schedule`,
    ADD COLUMN `category` VARCHAR(100) NOT NULL,
    ADD COLUMN `days` JSON NOT NULL,
    ADD COLUMN `destination` JSON NOT NULL,
    ADD COLUMN `originDate` INTEGER NOT NULL,
    ADD COLUMN `start` JSON NOT NULL,
    DROP COLUMN `date`,
    ADD COLUMN `date` JSON NOT NULL;
