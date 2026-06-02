import { prisma } from "@/lib/prisma";

type RecordSpanInput = {
  runId: string;
  type: "model_call" | "tool_call" | "decision" | "evaluator" | "system";
  name: string;
  toolName?: string;
  inputJson: unknown;
  outputJson?: unknown;
  status: "success" | "failed";
  latencyMs?: number;
  errorMessage?: string;
};

export async function recordSpan(input: RecordSpanInput) {
  return prisma.traceSpan.create({
    data: {
      runId: input.runId,
      type: input.type,
      name: input.name,
      toolName: input.toolName,
      inputJson: input.inputJson,
      outputJson: input.outputJson,
      status: input.status,
      latencyMs: input.latencyMs ?? 0,
      errorMessage: input.errorMessage,
    },
  });
}
