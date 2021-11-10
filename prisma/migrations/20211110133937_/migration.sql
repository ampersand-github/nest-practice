-- CreateTable
CREATE TABLE "M1_Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "M1_Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_Order" (
    "id" TEXT NOT NULL,

    CONSTRAINT "M1_Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_OrderDtail" (
    "id" TEXT NOT NULL,

    CONSTRAINT "M1_OrderDtail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_Sushi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "M1_Sushi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_SushiSetToSushi" (
    "id" TEXT NOT NULL,

    CONSTRAINT "M1_SushiSetToSushi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_SushiSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "M1_SushiSet_pkey" PRIMARY KEY ("id")
);
