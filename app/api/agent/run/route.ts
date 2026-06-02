import { z } from "zod";
import { mastra } from "@/mastra";

const runRequestSchema = z.object({
  userGoal: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = runRequestSchema.parse(body);

  const agent = mastra.getAgentById("ops-agent");

  const response = await agent.generate(parsedBody.userGoal);

  return Response.json({
    text: response.text,
    toolCalls: response.toolCalls,
    toolResults: response.toolResults,
    steps: response.steps,
    usage: response.usage,
  });
}
