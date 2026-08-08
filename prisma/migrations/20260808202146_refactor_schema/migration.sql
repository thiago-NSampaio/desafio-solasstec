/*
  Warnings:

  - The `roomId` column on the `entrys` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `schedulingId` column on the `entrys` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roomId` column on the `responsibles_rooms` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `schedulings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `roomId` column on the `schedulings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `visitors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `visitorId` on the `entrys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `schedulings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `visitorId` on the `schedulings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `visitors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "entrys" DROP CONSTRAINT "entrys_roomId_fkey";

-- DropForeignKey
ALTER TABLE "entrys" DROP CONSTRAINT "entrys_schedulingId_fkey";

-- DropForeignKey
ALTER TABLE "entrys" DROP CONSTRAINT "entrys_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "responsibles_rooms" DROP CONSTRAINT "responsibles_rooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_roomId_fkey";

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_visitorId_fkey";

-- AlterTable
ALTER TABLE "entrys" DROP COLUMN "visitorId",
ADD COLUMN     "visitorId" UUID NOT NULL,
DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID,
DROP COLUMN "schedulingId",
ADD COLUMN     "schedulingId" UUID;

-- AlterTable
ALTER TABLE "responsibles_rooms" DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID;

-- AlterTable
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "visitorId",
ADD COLUMN     "visitorId" UUID NOT NULL,
DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID,
ADD CONSTRAINT "schedulings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "visitors_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_schedulingId_fkey" FOREIGN KEY ("schedulingId") REFERENCES "schedulings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsibles_rooms" ADD CONSTRAINT "responsibles_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
