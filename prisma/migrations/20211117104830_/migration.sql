-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "authorId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pattern1Post" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Pattern1Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pattern1Category" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Pattern1Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnPosts" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnPosts_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Novel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manga" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentToNovel" (
    "novelId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "CommentToNovel_pkey" PRIMARY KEY ("novelId","commentId")
);

-- CreateTable
CREATE TABLE "CommentToManga" (
    "commentId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,

    CONSTRAINT "CommentToManga_pkey" PRIMARY KEY ("mangaId","commentId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageTreePath" (
    "ancestorId" TEXT NOT NULL,
    "descendantId" TEXT NOT NULL,

    CONSTRAINT "MessageTreePath_pkey" PRIMARY KEY ("ancestorId","descendantId")
);

-- CreateTable
CREATE TABLE "User2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User2Status" (
    "status" TEXT NOT NULL,

    CONSTRAINT "User2Status_pkey" PRIMARY KEY ("status")
);

-- CreateTable
CREATE TABLE "A4_CustomerStatus" (
    "status" TEXT NOT NULL,

    CONSTRAINT "A4_CustomerStatus_pkey" PRIMARY KEY ("status")
);

-- CreateTable
CREATE TABLE "A4_Matter" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "personalInfoId" TEXT NOT NULL,
    "recentTelephoneAtId" TEXT NOT NULL,
    "recentMeetAtId" TEXT NOT NULL,

    CONSTRAINT "A4_Matter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "A4_PersonalInfo" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "A4_PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "A4_TelephoneAt" (
    "id" TEXT NOT NULL,
    "telephoneAt" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "A4_TelephoneAt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "A4_MeetAt" (
    "id" TEXT NOT NULL,
    "A4_MeetAt" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "A4_MeetAt_pkey" PRIMARY KEY ("id")
);

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
    "orderId" TEXT NOT NULL,

    CONSTRAINT "M1_Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_OrderDtail" (
    "id" TEXT NOT NULL,
    "withoutWasabi" BOOLEAN NOT NULL,
    "count" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "sushiId" TEXT NOT NULL,

    CONSTRAINT "M1_OrderDtail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_Sushi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "M1_Sushi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_SushiSetToSushi" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "sushiId" TEXT NOT NULL,
    "sushiSetId" TEXT NOT NULL,

    CONSTRAINT "M1_SushiSetToSushi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M1_SushiSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "M1_SushiSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Pattern1Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Pattern1Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentToNovel" ADD CONSTRAINT "CommentToNovel_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentToNovel" ADD CONSTRAINT "CommentToNovel_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentToManga" ADD CONSTRAINT "CommentToManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentToManga" ADD CONSTRAINT "CommentToManga_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageTreePath" ADD CONSTRAINT "MessageTreePath_ancestorId_fkey" FOREIGN KEY ("ancestorId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageTreePath" ADD CONSTRAINT "MessageTreePath_descendantId_fkey" FOREIGN KEY ("descendantId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User2" ADD CONSTRAINT "User2_status_fkey" FOREIGN KEY ("status") REFERENCES "User2Status"("status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A4_Matter" ADD CONSTRAINT "A4_Matter_status_fkey" FOREIGN KEY ("status") REFERENCES "A4_CustomerStatus"("status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A4_Matter" ADD CONSTRAINT "A4_Matter_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "A4_PersonalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A4_Matter" ADD CONSTRAINT "A4_Matter_recentTelephoneAtId_fkey" FOREIGN KEY ("recentTelephoneAtId") REFERENCES "A4_TelephoneAt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "A4_Matter" ADD CONSTRAINT "A4_Matter_recentMeetAtId_fkey" FOREIGN KEY ("recentMeetAtId") REFERENCES "A4_MeetAt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_Order" ADD CONSTRAINT "M1_Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "M1_Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_OrderDtail" ADD CONSTRAINT "M1_OrderDtail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "M1_Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_OrderDtail" ADD CONSTRAINT "M1_OrderDtail_sushiId_fkey" FOREIGN KEY ("sushiId") REFERENCES "M1_Sushi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_SushiSetToSushi" ADD CONSTRAINT "M1_SushiSetToSushi_sushiId_fkey" FOREIGN KEY ("sushiId") REFERENCES "M1_Sushi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M1_SushiSetToSushi" ADD CONSTRAINT "M1_SushiSetToSushi_sushiSetId_fkey" FOREIGN KEY ("sushiSetId") REFERENCES "M1_SushiSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
