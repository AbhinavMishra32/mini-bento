import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const inboxCount = await prisma.inboxMessage.count();
  const calendarSlotCount = await prisma.calendarSlot.count();
  const crmLeadCount = await prisma.crmLead.count();
  const replayTaskCount = await prisma.replayTask.count();

  const latestInboxMessage = await prisma.inboxMessage.findFirst({
    orderBy: {
      receivedAt: "desc",
    },
  });

  return Response.json({
    counts: {
      inboxMessages: inboxCount,
      calendarSlots: calendarSlotCount,
      crmLeads: crmLeadCount,
      replayTasks: replayTaskCount,
    },
    latestInboxMessage,
  });
}
