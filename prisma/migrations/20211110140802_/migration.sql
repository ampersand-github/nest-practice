/*
  Warnings:

  - You are about to drop the column `sushiCount` on the `M1_SushiSetToSushi` table. All the data in the column will be lost.
  - Added the required column `price` to the `M1_SushiSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `M1_SushiSetToSushi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "M1_SushiSet" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "M1_SushiSetToSushi" DROP COLUMN "sushiCount",
ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "sushiId" TEXT,
ADD COLUMN     "sushiSetId" TEXT;

-- AddForeignKey
ALTER TABLE "M1_SushiSetToSushi" ADD CONSTRAINT "M1_SushiSetToSushi_sushiId_fkey" FOREIGN KEY ("sushiId") REFERENCES "M1_Sushi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_SushiSetToSushi" ADD CONSTRAINT "M1_SushiSetToSushi_sushiSetId_fkey" FOREIGN KEY ("sushiSetId") REFERENCES "M1_SushiSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
