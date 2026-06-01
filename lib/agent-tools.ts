import { prisma } from "@/lib/prisma";

type SearchInboxInput = {
  query: string;
  limit?: number;
}

export async function searchInbox(input: SearchInboxInput) {
  const limit = input.limit ?? 5;

  const messages = await prisma.inboxMessage.findMany({
    where: {
      OR: [
        {
          subject: {
            contains: input.query,
          },
        },
        {
          body: {
            contains: input.query,
          },
        },
        {
          from: {
            contains: input.query,
          },
        },
      ],
    },
    orderBy: {
      receivedAt: "desc",
    },
    take: limit,
  });

  return messages.map((message) => ({
    id: message.id,
    from: message.from,
    subject: message.subject,
    preview: message.body.slice(0, 140),
    receivedAt: message.receivedAt,
  }));
}

type ReadInboxMessageInput = {
  id: string;
};

// searched it used to get the overview and then agent will fetch actual data through id
export async function readInboxMessages(input: ReadInboxMessageInput) {
  const message = await prisma.inboxMessage.findUnique(({
    where: {
      id: input.id,
    }
  }));

  if (!message) {
    throw new Error(`Inbox message not found: ${input.id}`);
  }

  return {
    id: message.id,
    from: message.from,
    subject: message.subject,
    body: message.body,
    receivedAt: message.receivedAt,
  };
}

type CreateCrmLeadInput = {
  name: string;
  company: string;
  source: string;
  notes?: string;
};

export async function createCrmLead(input: CreateCrmLeadInput) {
  if (!input.name.trim()) {
    throw new Error("CRM lead name is required.");
  }

  if (!input.company.trim()) {
    throw new Error("CRM lead company is required.");
  }

  if (!input.source.trim()) {
    throw new Error("CRM lead source is required.");
  }

  const lead = await prisma.crmLead.create({
    data: {
      name: input.name,
      company: input.company,
      source: input.source,
      notes: input.notes,
    },
  });

  return {
    id: lead.id,
    name: lead.name,
    company: lead.company,
    source: lead.source,
    notes: lead.notes,
    createdAt: lead.createdAt,
  };
}

type FindCalendarSlotsInput = {
  team: string;
  onlyAvailable?: boolean;
  limit?: number;
};

export async function findCalendarSlots(input: FindCalendarSlotsInput) {
  const limit = input.limit ?? 5;
  const onlyAvailable = input.onlyAvailable ?? true;

  const slots = await prisma.calendarSlot.findMany({
    where: {
      team: input.team,
      isBooked: onlyAvailable ? false : undefined,
    },
    orderBy: {
      startsAt: "asc",
    },
    take: limit,
  });

  return slots.map((slot) => ({
    id: slot.id,
    team: slot.team,
    startsAt: slot.startsAt,
    durationMinutes: slot.durationMinutes,
    isBooked: slot.isBooked,
    bookedFor: slot.bookedFor,
  }));
}
