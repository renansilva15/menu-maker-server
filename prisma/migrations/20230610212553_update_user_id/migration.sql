/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ManagerToUser" DROP CONSTRAINT "_ManagerToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("nm");

-- AddForeignKey
ALTER TABLE "_ManagerToUser" ADD CONSTRAINT "_ManagerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("nm") ON DELETE CASCADE ON UPDATE CASCADE;
