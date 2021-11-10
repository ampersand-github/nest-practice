-- AlterTable
ALTER TABLE "M1_Order" ADD COLUMN     "customerId" TEXT;

-- AddForeignKey
ALTER TABLE "M1_Order" ADD CONSTRAINT "M1_Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "M1_Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
