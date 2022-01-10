-- CreateTable
CREATE TABLE "_JoinedGroups" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_JoinedGroups_AB_unique" ON "_JoinedGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_JoinedGroups_B_index" ON "_JoinedGroups"("B");
