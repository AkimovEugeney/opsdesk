-- CreateTable
CREATE TABLE "AppealUpdateMessage" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appealId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "AppealUpdateMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppealUpdateMessage" ADD CONSTRAINT "AppealUpdateMessage_appealId_fkey" FOREIGN KEY ("appealId") REFERENCES "Appeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppealUpdateMessage" ADD CONSTRAINT "AppealUpdateMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
