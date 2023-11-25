/*
  Warnings:

  - The `code` column on the `InfoTransporte` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "InfoTransporte" DROP COLUMN "code",
ADD COLUMN     "code" TEXT;

-- DropEnum
DROP TYPE "Code";
