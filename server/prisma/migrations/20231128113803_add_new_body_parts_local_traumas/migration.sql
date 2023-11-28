/*
  Warnings:

  - The values [PESCOCOPERNA] on the enum `localTraumasBodyPart` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "localTraumasBodyPart_new" AS ENUM ('ABDOMEN', 'ANTEBRACO', 'BRACO', 'CABECA', 'COSTAS', 'COXA', 'GLUTEOS', 'JOELHO', 'OMBRO', 'PEITO', 'PERNA', 'PESCOCO', 'PE', 'VIRILHA', 'CALCANHAR', 'MAO');
ALTER TABLE "trauma" ALTER COLUMN "bodyPart" TYPE "localTraumasBodyPart_new" USING ("bodyPart"::text::"localTraumasBodyPart_new");
ALTER TYPE "localTraumasBodyPart" RENAME TO "localTraumasBodyPart_old";
ALTER TYPE "localTraumasBodyPart_new" RENAME TO "localTraumasBodyPart";
DROP TYPE "localTraumasBodyPart_old";
COMMIT;
