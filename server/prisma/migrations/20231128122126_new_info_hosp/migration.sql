/*
  Warnings:

  - The `name` column on the `MateriaisDeixadosNoHospital` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `name` column on the `MateriaisDescartaveis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `name` column on the `ProcedimentoEfetuados` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MateriaisDeixadosNoHospital" DROP COLUMN "name",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "MateriaisDescartaveis" DROP COLUMN "name",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "ProcedimentoEfetuados" DROP COLUMN "name",
ADD COLUMN     "name" TEXT;

-- DropEnum
DROP TYPE "MateriaisDescartaveisNames";

-- DropEnum
DROP TYPE "MateriaisHospitalNames";

-- DropEnum
DROP TYPE "TProcedimentoEfetuadoName";
