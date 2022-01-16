-- CreateTable
CREATE TABLE "GroupProgress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "iteration" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GroupProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupProgress" ADD CONSTRAINT "GroupProgress_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupProgress" ADD CONSTRAINT "GroupProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
