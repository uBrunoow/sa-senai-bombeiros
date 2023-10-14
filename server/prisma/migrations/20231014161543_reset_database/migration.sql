/*
  Warnings:

  - The `BabyGender` column on the `GestationalAnamnesis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BabyGender" AS ENUM ('Male', 'Female', 'Other');

-- AlterTable
ALTER TABLE "GestationalAnamnesis" DROP COLUMN "BabyGender",
ADD COLUMN     "BabyGender" "BabyGender";
