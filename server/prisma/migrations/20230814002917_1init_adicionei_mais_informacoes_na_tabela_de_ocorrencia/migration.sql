-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "bloodPressure" INTEGER,
ADD COLUMN     "bodyPulse" INTEGER,
ADD COLUMN     "bodyTemp" INTEGER,
ADD COLUMN     "breathing" INTEGER,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "gender" BOOLEAN,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "reportDate" TIMESTAMP(3),
ADD COLUMN     "reportPlace" TEXT,
ADD COLUMN     "saturation" INTEGER,
ALTER COLUMN "updatedAt" DROP NOT NULL;
