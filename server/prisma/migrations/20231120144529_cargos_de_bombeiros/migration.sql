/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('segundoTenente', 'primeiroTenente', 'Capitao', 'Major', 'TenenteCoronel');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" NOT NULL;
