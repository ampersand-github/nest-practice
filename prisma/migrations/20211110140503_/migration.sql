/*
  Warnings:

  - Added the required column `price` to the `M1_Sushi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sushiCount` to the `M1_SushiSetToSushi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "M1_Sushi" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "M1_SushiSetToSushi" ADD COLUMN     "sushiCount" INTEGER NOT NULL;
