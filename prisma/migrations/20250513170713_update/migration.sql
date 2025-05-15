/*
  Warnings:

  - You are about to drop the column `userId` on the `Doctor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Doctor_userId_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "userId";
