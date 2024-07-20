const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.issue.create({
    data: {
      title: "hello@prisma.com",
      description: "something",
      status: "OPEN",
    },
  });

  const allUsers = await prisma.issue.findMany({
    select: {
      status: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
