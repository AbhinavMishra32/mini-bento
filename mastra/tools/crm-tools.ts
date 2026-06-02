import { createTool } from "@mastra/core/tools";
import { z } from "zod";

import { createCrmLead } from "@/lib/agent-tools";

export const createCrmLeadTool = createTool({
  id: "create-crm-lead",
  description:
    "Create a CRM lead after the agent has grounded the person's name, company, and source.",
  inputSchema: z.object({
    name: z.string().describe("Person name for the lead."),
    company: z.string().describe("Company name."),
    source: z.string().describe("Where this lead came from, for example inbound_email."),
    notes: z.string().optional().describe("Useful context about the lead."),
  }),
  outputSchema: z.object({
    id: z.string(),
    name: z.string(),
    company: z.string(),
    source: z.string(),
    notes: z.string().nullable(),
    createdAt: z.date(),
  }),
  execute: async (inputData) => {
    return createCrmLead(inputData);
  },
});
