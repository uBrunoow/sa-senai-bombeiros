-- AlterTable
ALTER TABLE "CinematicAvaliation" ADD COLUMN     "damagedPanel" BOOLEAN,
ADD COLUMN     "damagedWindshield" BOOLEAN,
ALTER COLUMN "comportamentalDisturb" DROP NOT NULL,
ALTER COLUMN "foundWithHelmet" DROP NOT NULL,
ALTER COLUMN "foundWithSeatbelt" DROP NOT NULL,
ALTER COLUMN "walkingInTheScene" DROP NOT NULL;
