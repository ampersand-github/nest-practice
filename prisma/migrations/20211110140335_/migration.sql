/*
  Warnings:

  - Added the required column `withoutWasabi` to the `M1_OrderDtail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "M1_OrderDtail" ADD COLUMN     "withoutWasabi" BOOLEAN NOT NULL;
