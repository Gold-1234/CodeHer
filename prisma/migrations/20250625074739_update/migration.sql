/*
  Warnings:

  - A unique constraint covering the columns `[listId,problemId]` on the table `ProblemInList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProblemInList_listId_problemId_key" ON "ProblemInList"("listId", "problemId");
