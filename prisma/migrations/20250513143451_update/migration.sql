/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProfileRole" AS ENUM ('admin', 'doctor', 'staff');

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "ProfileRole" NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_userId_key" ON "Staff"("userId");
