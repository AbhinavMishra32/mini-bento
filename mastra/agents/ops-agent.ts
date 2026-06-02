import { Agent } from "@mastra/core/agent";

import {
  bookCalendarSlotTool,
  findCalendarSlotsTool,
} from "../tools/calendar-tools";

import { createCrmLeadTool } from "../tools/crm-tools";

import {
  readInboxMessageTool,
  searchInboxTool,
} from "../tools/inbox-tools";


export const opsAgent = new Agent({
  id: "ops-agent",
  name: "Ops Agent",
  instructions: `
You are an internal operations agent for a small AI scheduling company.

You can inspect local inbox messages, create CRM leads, and book calendar slots.

Rules:
- Use tools when the task requires data or state changes.
- Do not claim that you created or booked something unless a tool result proves it.
- For inbox tasks, search first. Read the exact message when details matter.
- For CRM tasks, ground the lead in inbox/user-provided evidence before creating it.
- For calendar tasks, find available slots before booking.
- If required information is missing, say what is missing instead of inventing it.
- Keep final answers short and factual.
`,
  model: "google/gemini-3-flash-preview",
  tools: {
    searchInboxTool,
    readInboxMessageTool,
    createCrmLeadTool,
    findCalendarSlotsTool,
    bookCalendarSlotTool,
  },
});
