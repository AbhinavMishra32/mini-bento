import { createTool } from "@mastra/core/tools";
import { z } from "zod";

import {
  readInboxMessage,
  searchInbox,
} from "@/lib/agent-tools";

export const searchInboxTool = createTool({
  id: "search-inbox",
  description:
    "Search local inbox messages by sender, subject, or body text. Use this before reading a full message",
  inputSchema: z.object({
    query: z.string().describe("Search text like invoice, pricing, Riya, Vercel, or a compnay name."),
    limit: z.number().optional().describe("Maximum number of results to return."),
  }),
  outputSchema: z.array(
    z.object({
      id: z.string(),
      from: z.string(),
      subject: z.string(),
      preview: z.string(),
      receivedAt: z.date(),
    }),
  ),
  execute: async (inputData) => {
    return searchInbox(inputData);
  },
});

export const readInboxMessageTool = createTool({
  id: "read-inbox-message",
  description:
    "Read the full body of a specific inbox message. Use the id returned by search-inbox.",
  inputSchema: z.object({
    id: z.string().describe("Inbox message id returned by search-inbox."),
  }),
  outputSchema: z.object({
    id: z.string(),
    from: z.string(),
    subject: z.string(),
    body: z.string(),
    receivedAt: z.date(),
  }),
  execute: async (inputData) => {
    return readInboxMessage(inputData);
  },
});
