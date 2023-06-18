/*
  Warnings:

  - You are about to drop the column `nm` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `nm` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nm` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "nm",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "nm",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nm",
ADD COLUMN     "name" TEXT NOT NULL;
