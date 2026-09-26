-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('CAN_MANAGE_APPEALS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "Permissions"[] DEFAULT ARRAY[]::"Permissions"[];
