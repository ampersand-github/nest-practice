/*
  Warnings:

  - You are about to drop the column `customerId` on the `M1_Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "M1_Order" DROP CONSTRAINT "M1_Order_customerId_fkey";

-- AlterTable
ALTER TABLE "M1_Order" DROP COLUMN "customerId",
ADD COLUMN     "orderId" TEXT;

-- AlterTable
ALTER TABLE "M1_OrderDtail" ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "sushiId" TEXT;

-- AddForeignKey
ALTER TABLE "M1_Order" ADD CONSTRAINT "M1_Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "M1_Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_OrderDtail" ADD CONSTRAINT "M1_OrderDtail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "M1_Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_OrderDtail" ADD CONSTRAINT "M1_OrderDtail_sushiId_fkey" FOREIGN KEY ("sushiId") REFERENCES "M1_Sushi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
