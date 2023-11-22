-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'semCargo';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL;
