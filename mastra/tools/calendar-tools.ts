import { createTool } from "@mastra/core/tools";
import { z } from "zod";

import {
  bookCalendarSlot,
  findCalendarSlots,
} from "@/lib/agent-tools";

export const findCalendarSlotsTool = createTool({
  id: "find-calendar-slots",
  description:
    "Find calendar slots for a team. Use this before booking a calendar slot.",
  inputSchema: z.object({
    team: z.string().describe("Team name, for example sales or support."),
    onlyAvailable: z.boolean().optional().describe("Whether to return only unbooked slots."),
    limit: z.number().optional().describe("Maximum number of slots to return."),
  }),
  outputSchema: z.array(
    z.object({
      id: z.string(),
      team: z.string(),
      startsAt: z.date(),
      durationMinutes: z.number(),
      isBooked: z.boolean(),
      bookedFor: z.string().nullable(),
    }),
  ),
  execute: async (inputData) => {
    return findCalendarSlots(inputData);
  },
});

export const bookCalendarSlotTool = createTool({
  id: "book-calendar-slot",
  description:
    "Book one available calendar slot by id. Only use this after finding available slots.",
  inputSchema: z.object({
    slotId: z.string().describe("Calendar slot id returned by find-calendar-slots."),
    bookedFor: z.string().describe("Short reason for the booking."),
  }),
  outputSchema: z.object({
    id: z.string(),
    team: z.string(),
    startsAt: z.date(),
    durationMinutes: z.number(),
    isBooked: z.boolean(),
    bookedFor: z.string().nullable(),
  }),
  execute: async (inputData) => {
    return bookCalendarSlot(inputData);
  },
});
