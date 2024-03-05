-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shopTitle" TEXT;

-- CreateTable
CREATE TABLE "Shop" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_title_key" ON "Shop"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopTitle_fkey" FOREIGN KEY ("shopTitle") REFERENCES "Shop"("title") ON DELETE SET NULL ON UPDATE CASCADE;
