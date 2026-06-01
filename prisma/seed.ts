import { prisma } from "../lib/prisma";


const inboxMessages = [
  {
    from: "billing@vercel.com",
    subject: "Invoice for May 2026",
    body: "Your invoice for May 2026 is ₹2,940. The payment is due on June 7, 2026.",
    receivedAt: new Date("2026-05-28T10:30:00.000Z"),
  },
  {
    from: "support@linear.app",
    subject: "Your workspace trial is ending",
    body: "Your Linear trial ends soon. Upgrade before June 5 to keep premium features.",
    receivedAt: new Date("2026-05-26T08:00:00.000Z"),
  },
  {
    from: "accounts@figma.com",
    subject: "Figma receipt",
    body: "Receipt for your Figma subscription. Amount paid: ₹1,250. No action required.",
    receivedAt: new Date("2026-05-20T14:10:00.000Z"),
  },
  {
    from: "riya@northstar.ai",
    subject: "Interested in your AI scheduling product",
    body: "Hey, I am Riya from Northstar Analytics. We are evaluating AI scheduling tools for our sales team. Can someone reach out with pricing?",
    receivedAt: new Date("2026-05-30T11:45:00.000Z"),
  },
];

const calendarSlots = [
  {
    team: "sales",
    startsAt: new Date("2026-06-03T05:30:00.000Z"),
    durationMinutes: 30,
    isBooked: false,
  },
  {
    team: "sales",
    startsAt: new Date("2026-06-03T06:30:00.000Z"),
    durationMinutes: 30,
    isBooked: false,
  },
  {
    team: "sales",
    startsAt: new Date("2026-06-03T07:30:00.000Z"),
    durationMinutes: 30,
    isBooked: true,
    bookedFor: "Existing customer call",
  },
  {
    team: "support",
    startsAt: new Date("2026-06-03T08:30:00.000Z"),
    durationMinutes: 30,
    isBooked: false,
  },
];

const crmLeads = [
  {
    name: "Aman Gupta",
    company: "BrightDesk",
    source: "inbound_email",
    notes: "Asked about team scheduling features.",
  },
];

const replayTasks = [
  {
    type: "inbox" as const,
    userGoal: "Find my latest invoice email and summarize the amount and due date.",
    expectedOutcome: "Agent should identify the Vercel invoice, amount ₹2,940, due date June 7, 2026.",
  },
  {
    type: "crm" as const,
    userGoal: "Create a CRM lead from the email sent by Riya from Northstar Analytics.",
    expectedOutcome: "Agent should create a CRM lead with name Riya, company Northstar Analytics, and source inbound_email.",
  },
  {
    type: "calendar" as const,
    userGoal: "Book the first available sales slot for a pricing discussion with Riya.",
    expectedOutcome: "Agent should book the earliest unbooked sales slot.",
  },
];

async function main() {
  await prisma.traceSpan.deleteMany();
  await prisma.agentRun.deleteMany();
  await prisma.learningArtifact.deleteMany();
  await prisma.failureCluster.deleteMany();
  await prisma.replayEvaluation.deleteMany();

  await prisma.replayTask.deleteMany();
  await prisma.crmLead.deleteMany();
  await prisma.calendarSlot.deleteMany();
  await prisma.inboxMessage.deleteMany();

  await prisma.inboxMessage.createMany({
    data: inboxMessages,
  });

  await prisma.calendarSlot.createMany({
    data: calendarSlots,
  });

  await prisma.crmLead.createMany({
    data: crmLeads,
  });

  await prisma.replayTask.createMany({
    data: replayTasks,
  });

  console.log("Seeded local agent world.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
