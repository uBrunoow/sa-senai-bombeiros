-- CreateEnum
CREATE TYPE "localTraumaSide" AS ENUM ('RIGHT', 'LEFT');

-- CreateEnum
CREATE TYPE "localTraumaFace" AS ENUM ('FRONT', 'BACK');

-- CreateEnum
CREATE TYPE "localTraumasBodyPart" AS ENUM ('COSTAS', 'PESCOCO', 'GLUTEOS', 'BRACO', 'ANTEBRACO', 'PESCOCOPERNA', 'COXA', 'CABECA');

-- CreateEnum
CREATE TYPE "tipoTrauma" AS ENUM ('FRATURA', 'DIVERSOS', 'HEMORRAGIAS', 'ESVICERACAO', 'FAV_FAV', 'AMPUTACAO', 'QUEIMADURA_1GRAU', 'QUEIMADURA_2GRAU', 'QUEIMADURA_3GRAU');

-- CreateTable
CREATE TABLE "trauma" (
    "id" SERIAL NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "tipo" "tipoTrauma" NOT NULL,
    "bodyPart" "localTraumasBodyPart" NOT NULL,
    "side" "localTraumaSide" NOT NULL,
    "face" "localTraumaFace" NOT NULL,

    CONSTRAINT "trauma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trauma" ADD CONSTRAINT "trauma_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
