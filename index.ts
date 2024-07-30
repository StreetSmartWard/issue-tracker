const prisma = require("@/prisma/client.ts");

async function main() {
  const issue = await prisma.issue.create({
    data: {
      title: "hello@prisma.com",
      description: "something",
      status: "OPEN",
    },
  });
  console.log(issue);
  const allUsers = await prisma.issue.findMany({
    select: {
      status: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
