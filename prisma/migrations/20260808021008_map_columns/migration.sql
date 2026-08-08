/*
  Warnings:

  - You are about to drop the column `enteredAt` on the `entrys` table. All the data in the column will be lost.
  - You are about to drop the column `exitedAt` on the `entrys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "entrys" DROP COLUMN "enteredAt",
DROP COLUMN "exitedAt",
ADD COLUMN     "entered_at" TIMESTAMP(3),
ADD COLUMN     "exited_at" TIMESTAMP(3);
