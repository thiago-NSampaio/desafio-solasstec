/*
  Warnings:

  - The primary key for the `entrys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `holidays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `responsibles_rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `types_prioritys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `priorityLevelId` column on the `visitors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `entrys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `holidays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `responsibles_rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `types_prioritys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_priorityLevelId_fkey";

-- AlterTable
ALTER TABLE "entrys" DROP CONSTRAINT "entrys_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "entrys_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "holidays" DROP CONSTRAINT "holidays_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "holidays_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "responsibles_rooms" DROP CONSTRAINT "responsibles_rooms_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "responsibles_rooms_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "types_prioritys" DROP CONSTRAINT "types_prioritys_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "types_prioritys_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "priorityLevelId",
ADD COLUMN     "priorityLevelId" UUID;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_priorityLevelId_fkey" FOREIGN KEY ("priorityLevelId") REFERENCES "types_prioritys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
