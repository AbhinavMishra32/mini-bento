-- CreateTable
CREATE TABLE "AgentRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userGoal" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "TraceSpan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "toolName" TEXT,
    "inputJson" JSONB NOT NULL,
    "outputJson" JSONB,
    "status" TEXT NOT NULL,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TraceSpan_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AgentRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FailureCluster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "failureClass" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "affectedRunIds" TEXT NOT NULL,
    "suggestedFix" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "LearningArtifact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trigger" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "confidence" REAL NOT NULL DEFAULT 0,
    "measuredLift" REAL NOT NULL DEFAULT 0,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "successes" INTEGER NOT NULL DEFAULT 0,
    "failures" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'candidate',
    "sourceFailureClusterId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LearningArtifact_sourceFailureClusterId_fkey" FOREIGN KEY ("sourceFailureClusterId") REFERENCES "FailureCluster" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReplayEvaluation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "oldVersion" TEXT NOT NULL,
    "newVersion" TEXT NOT NULL,
    "testedRuns" INTEGER NOT NULL,
    "regressions" INTEGER NOT NULL,
    "improvements" INTEGER NOT NULL,
    "unchanged" INTEGER NOT NULL,
    "costDeltaCents" INTEGER NOT NULL,
    "latencyDeltaMs" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ReplayTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "userGoal" TEXT NOT NULL,
    "expectedOutcome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "InboxMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "receivedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CalendarSlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "bookedFor" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CrmLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "AgentRun_status_idx" ON "AgentRun"("status");

-- CreateIndex
CREATE INDEX "AgentRun_taskType_idx" ON "AgentRun"("taskType");

-- CreateIndex
CREATE INDEX "AgentRun_promptVersion_idx" ON "AgentRun"("promptVersion");

-- CreateIndex
CREATE INDEX "AgentRun_createdAt_idx" ON "AgentRun"("createdAt");

-- CreateIndex
CREATE INDEX "TraceSpan_runId_idx" ON "TraceSpan"("runId");

-- CreateIndex
CREATE INDEX "TraceSpan_type_idx" ON "TraceSpan"("type");

-- CreateIndex
CREATE INDEX "TraceSpan_status_idx" ON "TraceSpan"("status");

-- CreateIndex
CREATE INDEX "TraceSpan_toolName_idx" ON "TraceSpan"("toolName");

-- CreateIndex
CREATE INDEX "FailureCluster_failureClass_idx" ON "FailureCluster"("failureClass");

-- CreateIndex
CREATE INDEX "FailureCluster_severity_idx" ON "FailureCluster"("severity");

-- CreateIndex
CREATE INDEX "FailureCluster_createdAt_idx" ON "FailureCluster"("createdAt");

-- CreateIndex
CREATE INDEX "LearningArtifact_status_idx" ON "LearningArtifact"("status");

-- CreateIndex
CREATE INDEX "LearningArtifact_sourceFailureClusterId_idx" ON "LearningArtifact"("sourceFailureClusterId");

-- CreateIndex
CREATE INDEX "LearningArtifact_createdAt_idx" ON "LearningArtifact"("createdAt");

-- CreateIndex
CREATE INDEX "ReplayEvaluation_oldVersion_idx" ON "ReplayEvaluation"("oldVersion");

-- CreateIndex
CREATE INDEX "ReplayEvaluation_newVersion_idx" ON "ReplayEvaluation"("newVersion");

-- CreateIndex
CREATE INDEX "ReplayEvaluation_passed_idx" ON "ReplayEvaluation"("passed");

-- CreateIndex
CREATE INDEX "ReplayEvaluation_createdAt_idx" ON "ReplayEvaluation"("createdAt");

-- CreateIndex
CREATE INDEX "ReplayTask_type_idx" ON "ReplayTask"("type");

-- CreateIndex
CREATE INDEX "ReplayTask_createdAt_idx" ON "ReplayTask"("createdAt");

-- CreateIndex
CREATE INDEX "InboxMessage_receivedAt_idx" ON "InboxMessage"("receivedAt");

-- CreateIndex
CREATE INDEX "InboxMessage_subject_idx" ON "InboxMessage"("subject");

-- CreateIndex
CREATE INDEX "InboxMessage_from_idx" ON "InboxMessage"("from");

-- CreateIndex
CREATE INDEX "CalendarSlot_team_idx" ON "CalendarSlot"("team");

-- CreateIndex
CREATE INDEX "CalendarSlot_startsAt_idx" ON "CalendarSlot"("startsAt");

-- CreateIndex
CREATE INDEX "CalendarSlot_isBooked_idx" ON "CalendarSlot"("isBooked");

-- CreateIndex
CREATE INDEX "CrmLead_company_idx" ON "CrmLead"("company");

-- CreateIndex
CREATE INDEX "CrmLead_createdAt_idx" ON "CrmLead"("createdAt");
