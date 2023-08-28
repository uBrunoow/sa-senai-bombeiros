/*
  Warnings:

  - You are about to drop the `Glasglow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Glasglow" DROP CONSTRAINT "Glasglow_ReportOwnerId_fkey";

-- DropTable
DROP TABLE "Glasglow";

-- CreateTable
CREATE TABLE "CinematicAvaliation" (
    "id" SERIAL NOT NULL,
    "comportamentalDisturb" BOOLEAN NOT NULL,
    "foundWithHelmet" BOOLEAN NOT NULL,
    "foundWithSeatbelt" BOOLEAN NOT NULL,
    "walkingInTheScene" BOOLEAN NOT NULL,

    CONSTRAINT "CinematicAvaliation_pkey" PRIMARY KEY ("id")
);
