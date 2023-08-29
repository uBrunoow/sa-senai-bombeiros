/*
  Warnings:

  - You are about to drop the column `classOwnerId` on the `SuspectProblems` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SuspectProblems` table. All the data in the column will be lost.
  - You are about to drop the `SuspectProblemsClasses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Another` to the `SuspectProblems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SuspectProblems" DROP CONSTRAINT "SuspectProblems_classOwnerId_fkey";

-- AlterTable
ALTER TABLE "SuspectProblems" DROP COLUMN "classOwnerId",
DROP COLUMN "name",
ADD COLUMN     "Another" TEXT NOT NULL;

-- DropTable
DROP TABLE "SuspectProblemsClasses";

-- CreateTable
CREATE TABLE "Problems" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "suspectProblemsId" INTEGER,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problems" ADD CONSTRAINT "Problems_suspectProblemsId_fkey" FOREIGN KEY ("suspectProblemsId") REFERENCES "SuspectProblems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
