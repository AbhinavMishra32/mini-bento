import {
  bookCalendarSlot,
  createCrmLead,
  findCalendarSlots,
  readInboxMessage,
  searchInbox,
} from "@/lib/agent-tools";

export async function POST() {
  const inboxResults = await searchInbox({
    query: "invoice",
    limit: 3,
  });

  const firstInboxResult = inboxResults[0];

  const fullMessage = firstInboxResult
    ? await readInboxMessage({
      id: firstInboxResult.id,
    })
    : null;

  const crmLead = await createCrmLead({
    name: "Riya",
    company: "Northstar Analytics",
    source: "inbound_email",
    notes: "Interested in AI scheduling product pricing.",
  });

  const availableSalesSlots = await findCalendarSlots({
    team: "sales",
    onlyAvailable: true,
    limit: 2,
  });

  const firstAvailableSlot = availableSalesSlots[0];

  const bookedSlot = firstAvailableSlot
    ? await bookCalendarSlot({
      slotId: firstAvailableSlot.id,
      bookedFor: "Pricing discussion with Riya",
    })
    : null;

  return Response.json({
    inboxResults,
    fullMessage,
    crmLead,
    availableSalesSlots,
    bookedSlot,
  });
}


