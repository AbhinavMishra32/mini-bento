-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgentRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userGoal" TEXT NOT NULL,
    "taskType" TEXT,
    "model" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'running',
    "costCents" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "finalAnswer" TEXT,
    "failureSummary" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AgentRun" ("costCents", "createdAt", "failureSummary", "finalAnswer", "id", "latencyMs", "model", "promptVersion", "status", "taskType", "updatedAt", "userGoal") SELECT "costCents", "createdAt", "failureSummary", "finalAnswer", "id", "latencyMs", "model", "promptVersion", "status", "taskType", "updatedAt", "userGoal" FROM "AgentRun";
DROP TABLE "AgentRun";
ALTER TABLE "new_AgentRun" RENAME TO "AgentRun";
CREATE INDEX "AgentRun_status_idx" ON "AgentRun"("status");
CREATE INDEX "AgentRun_taskType_idx" ON "AgentRun"("taskType");
CREATE INDEX "AgentRun_promptVersion_idx" ON "AgentRun"("promptVersion");
CREATE INDEX "AgentRun_createdAt_idx" ON "AgentRun"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
