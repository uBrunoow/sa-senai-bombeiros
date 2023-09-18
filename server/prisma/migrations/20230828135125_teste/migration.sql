/*
  Warnings:

  - You are about to drop the column `gender` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "gender";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender";
