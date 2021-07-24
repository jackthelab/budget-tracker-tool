const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main () {
  await allUsers();
}

async function allUsers () {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

async function createUser (first, last, newEmail) {

  const newUser = await prisma.user.create({
    data: {
      firstName: first,
      lastName: last,
      email: newEmail
    }
  })

  console.log(newUser);

}

main()
  .catch( e => {
    throw e
  })
  .finally( async () => {
    await prisma.$disconnect()
  })